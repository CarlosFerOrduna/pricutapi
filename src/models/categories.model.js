import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
})

const categoryModel = model('categories', categorySchema)

export default categoryModel
