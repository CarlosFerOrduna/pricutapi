import { model, Schema } from 'mongoose'

const materialSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ['madera'] },
    price: { type: Number, required: true },
    thickness: { type: String, required: true },
    areaStandard: { type: Number, required: true, default: 900 }
})

const materialModel = model('models', materialSchema)

export default materialModel
