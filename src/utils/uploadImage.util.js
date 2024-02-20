import cloudinary from 'cloudinary'
import config from '../config/index.js'

export const uploadImage = async ({ svgCode = null, image = null }) => {
    if (config.env === 'dev') return 'fake'

    const { cloudName, apiKey, apiSecret } = config.cloudinary

    cloudinary.v2.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
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
}

export const deleteImages = async ({ publicIds }) => {
    const { cloudName, apiKey, apiSecret } = config.cloudinary

    if (!publicIds || !Array.isArray(publicIds)) return

    cloudinary.v2.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
    })

    for (const publicId of publicIds) {
        await cloudinary.v2.uploader.destroy(publicId)
    }
}
