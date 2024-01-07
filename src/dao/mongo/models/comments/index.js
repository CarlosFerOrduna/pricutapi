import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const commentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    details: { type: String, required: true }
})

commentSchema.plugin(paginate)

export const commentModel = model('comments', commentSchema)
