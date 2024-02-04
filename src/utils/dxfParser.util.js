import DxfParser from 'dxf-parser'

import { productModel } from '../dao/mongo/models/index.js'
import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../middlewares/errors/index.js'

export const dxfParser = (buffer) => {
    const parser = new DxfParser()

    return parser.parseSync(buffer.toString())
}

export const calculateDimensions = ({ buffer }) => {
    const dxf = dxfParser(buffer)

    const extMax = dxf.header['$EXTMAX']
    const extMin = dxf.header['$EXTMIN']
    const isMM = dxf.header['$INSUNITS'] !== 1
    const width = Math.abs(extMax.x - extMin.x)
    const high = Math.abs(extMax.y - extMin.y)

    const widthMM = (isMM ? width : width * 25.4).toFixed(3) //?ok
    const highMM = (isMM ? high : high * 25.4).toFixed(3) //?ok
    const widthIN = (!isMM ? width : width / 25.4).toFixed(3)
    const highIN = (!isMM ? high : high / 25.4).toFixed(3)

    return {
        widthMM,
        highMM,
        perimeterMM: (widthMM * 2 + highMM * 2).toFixed(3),
        areaMM: (widthMM * highMM).toFixed(3),
        widthIN,
        highIN,
        perimeterIN: (widthIN * 2 + highIN * 2).toFixed(3),
        areaIN: (widthIN * highIN).toFixed(3),
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
