import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const citiesSchema = new Schema({
    key: { type: Number, required: true },
    value: { type: String, required: true }
})

citiesSchema.plugin(paginate)

export const citiesModel = model('cities', citiesSchema)
