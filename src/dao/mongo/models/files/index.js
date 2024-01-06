import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const fileSchema = new Schema({
    name: { type: String, required: true },
    file: { type: Buffer, required: true },
    url: { type: String, required: true }
})

fileSchema.plugin(paginate)

const fileModel = model('files', fileSchema)

export default fileModel
