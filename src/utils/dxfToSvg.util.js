import dxf from 'dxf'

export const ConvertDxfToSvg = (dxfBuffer) => {
    try {
        const dxfContent = dxfBuffer.toString('utf-8')

        const parsed = dxf.parseString(dxfContent)

        return dxf.toSVG(parsed)
    } catch (error) {
        throw new Error(`Error convirtiendo dxf to svg: ${error}`)
    }
}
