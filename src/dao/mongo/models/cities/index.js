import { Schema, model } from 'mongoose'

const citiesSchema = new Schema({
    key: { type: Number, required: true },
    value: { type: String, required: true }
})

export const citiesModel = model('cities', citiesSchema)
