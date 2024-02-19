import DxfParser from 'dxf-parser'

import { productModel } from '../dao/mongo/models/index.js'
import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../middlewares/errors/index.js'

export const dxfParser = (buffer) => {
    const parser = new DxfParser()

    return parser.parseSync(buffer.toString())
}

export const calculateDimensions = ({ buffer }) => {
    const dxf = dxfParser(buffer)
    let minX = Infinity
    let maxX = -Infinity
    let minY = Infinity
    let maxY = -Infinity

    const { x: xHeaderMax, y: yHeaderMax } = dxf.header['$EXTMAX']
    const { x: xHeaderMin, y: yHeaderMin } = dxf.header['$EXTMIN']

    minX = Math.min(minX, xHeaderMin)
    maxX = Math.max(maxX, xHeaderMax)
    minY = Math.min(minY, yHeaderMin)
    maxY = Math.max(maxY, yHeaderMax)

    dxf.entities.forEach((entity) => {
        if (!entity?.vertices) return

        entity.vertices.forEach((vertex) => {
            minX = Math.min(minX, vertex.x)
            maxX = Math.max(maxX, vertex.x)
            minY = Math.min(minY, vertex.y)
            maxY = Math.max(maxY, vertex.y)
        })
    })

    for (const key in dxf.blocks) {
        if (!dxf.blocks.hasOwnProperty(key)) continue

        const block = dxf.blocks[key]
        if (!block?.entities || !Array.isArray(block.entities)) continue

        block.entities.forEach((entity) => {
            const { vertices } = entity
            if (!vertices || !Array.isArray(vertices)) return

            entity.vertices.forEach((vertex) => {
                minX = Math.min(minX, vertex.x)
                maxX = Math.max(maxX, vertex.x)
                minY = Math.min(minY, vertex.y)
                maxY = Math.max(maxY, vertex.y)
            })
        })
    }

    const width = maxX - minX
    const high = maxY - minY

    return {
        width: width.toFixed(3),
        high: high.toFixed(3),
        perimeter: (width * 2 + high * 2).toFixed(3),
        area: (width * high).toFixed(3),
    }
}

export const calculatePrice = async ({ dimensions, pid }) => {
    const product = await productModel.findById(pid)
    if (!product) {
        ErrorWrapper.createError({
            name: 'product not exists',
            cause: invalidFieldErrorInfo({
                name: 'product',
                type: 'string',
                value: product,
            }),
            message: 'Error to get product',
            code: codes.NOT_FOUND,
        })
    }

    return (product.price * (dimensions.areaMM / product.areaStandard)).toFixed(2)
}
