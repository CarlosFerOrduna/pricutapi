import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { dxfParser } from '../utils/dxfParser.util.js'

const fileSchema = new Schema({
    name: { type: String, required: true },
    file: { type: Buffer, required: true }
})

fileSchema.plugin(paginate)

const fileModel = model('files', fileSchema)

export default fileModel
