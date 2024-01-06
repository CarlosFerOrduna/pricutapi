import { Schema, model } from 'mongoose'

const shippingSchema = new Schema({
    cityOrigin: { type: Schema.Types.ObjectId, require: true, ref: 'cities' },
    cityDestination: { type: Schema.Types.ObjectId, require: true, ref: 'cities' },
    weight: { type: Number, require: true },
    long: { type: Number, require: true },
    high: { type: Number, require: true },
    width: { type: Number, require: true },
    price: { type: Number, require: true }
})

const shippingModel = model('shipping', shippingSchema)

export default shippingModel
