import DxfParser from 'dxf-parser'
import materialModel from '../models/materials.model.js'

export const dxfParser = (buffer) => {
    const parser = new DxfParser()

    return parser.parseSync(buffer.toString())
}

export const calculateDimensions = (buffer) => {
    // EXTMIN: esquina inferior izquierda
    // EXTMAX: esquina superior derecha

    const parser = new DxfParser()

    const dxf = parser.parseSync(buffer.toString())

    const extMax = dxf.header['$EXTMAX']
    const extMin = dxf.header['$EXTMIN']
    const units = dxf.header['$INSUNITS'] == 4 ? 'IN' : 'MM'
    const width = extMax.x - extMin.x
    const high = extMax.y - extMin.y

    const widthMM = (units == 'MM' ? width : width / 25.4).toFixed(3)
    const highMM = (units == 'MM' ? high : high / 25.4).toFixed(3)
    const widthIN = (units == 'IN' ? width : width * 25.4).toFixed(3)
    const highIN = (units == 'IN' ? high : high * 25.4).toFixed(3)

    return {
        widthMM,
        highMM,
        perimeterMM: (widthMM * 2 + highMM * 2).toFixed(3),
        areaMM: (widthMM * highMM).toFixed(3),
        widthIN,
        highIN,
        perimeterIN: (widthIN * 2 + highIN * 2).toFixed(3),
        areaIN: (widthIN * highIN).toFixed(3)
    }
}

export const calculatePrice = async (dimensions, mid) => {
    // ac = area pieza a calcular
    // ae = area estandar
    // p = precio estandar
    // ac = p . (ac/ae)

    const material = await materialModel.findById(mid)
    if (!material) throw new Error('material not exists')

    return (material.price * (dimensions.areaMM / material.areaStandard)).toFixed(2)
}
