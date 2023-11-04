import { Schema, model } from 'mongoose'
import { paginate } from 'mongoose-paginate-v2'

const articleSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true }
})

articleSchema.plugin(paginate)

const articleModel = model('articles', articleSchema)

export default articleModel
