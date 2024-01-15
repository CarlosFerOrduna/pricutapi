import cloudinary from 'cloudinary'
import config from '../config/index.js'

export const uploadImage = async ({ svgCode = null, image = null }) => {
    try {
        cloudinary.v2.config({
            cloud_name: config.cloudName,
            api_key: config.apiKey,
            api_secret: config.apiSecret,
        })

        let path
        if (svgCode) {
            const buffer = Buffer.from(svgCode).toString('base64')
            path = `data:image/svg+xml;base64,${buffer}`
        }
        if (image?.buffer) {
            path = `data:image/jpeg;base64,${image.buffer.toString('base64')}`
        }

        const { secure_url } = await cloudinary.v2.uploader.upload(path)

        return secure_url
    } catch (error) {
        throw new Error(`Error al cargar la imagen en Cloudinary: ${error.message}`)
    }
}
