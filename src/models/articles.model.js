import { Schema, model } from 'mongoose'

const articleSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true }
})

const articleModel = model('articles', articleSchema)

export default articleModel
