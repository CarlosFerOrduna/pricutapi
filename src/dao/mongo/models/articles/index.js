import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const articleSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true }
})

articleSchema.plugin(paginate)

export const articleModel = model('articles', articleSchema)
