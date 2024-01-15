import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export const uploadMultipleImages = upload.fields([
    { name: 'aboutImage', maxCount: 1 },
    { name: 'commonUsesImage', maxCount: 1 },
    { name: 'large', maxCount: 1 },
    { name: 'small', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
    { name: 'file', maxCount: 1 },
])
