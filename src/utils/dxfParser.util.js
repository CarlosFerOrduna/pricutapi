import DxfParser from 'dxf-parser'

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
