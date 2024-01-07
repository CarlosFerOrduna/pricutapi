import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
})

categorySchema.plugin(paginate)

export const categoryModel = model('categories', categorySchema)
