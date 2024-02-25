import { Schema, model } from 'mongoose'

const shippingSchema = new Schema(
    {
        cityOrigin: { type: Schema.Types.ObjectId, require: true, ref: 'cities' },
        cityDestination: { type: Schema.Types.ObjectId, require: true, ref: 'cities' },
        weight: { type: Number, require: true },
        long: { type: Number, require: true },
        high: { type: Number, require: true },
        width: { type: Number, require: true },
        price: { type: Number, require: true },
        status: { type: String, enum: ['enable', 'disable'], default: 'enable' },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true },
)

shippingSchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = new Date()

    return this.save()
}

shippingSchema.pre('find', function () {
    this.where({ deletedAt: null })
})

export const shippingModel = model('shipping', shippingSchema)
