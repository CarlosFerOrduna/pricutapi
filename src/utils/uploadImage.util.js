import cloudinary from 'cloudinary'

export const uploadImage = async (svgCode) => {
    try {
        cloudinary.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })

        const result = await new Promise((resolve, reject) => {
            const buffer = Buffer.from(svgCode).toString('base64')
            const image = `data:image/svg+xml;base64,${buffer}`

            cloudinary.v2.uploader.upload(image, (error, result) => {
                if (error) reject(error)
                else resolve(result)
            })
        })

        return result.secure_url
    } catch (error) {
        throw new Error(`Error al cargar la imagen en Cloudinary: ${error.message}`)
    }
}
