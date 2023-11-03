import { Schema, model } from 'mongoose'

const commentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'usuarios', required: true },
    details: { type: String, required: true }
})

const commentModel = model('comments', commentSchema)

export default commentModel
