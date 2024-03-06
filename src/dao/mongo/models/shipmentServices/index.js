import { Schema, model } from 'mongoose'

const shipmentServiceSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        standardPrice: { type: Number, require: true },
        standardWeight: { type: Number, require: true },
        pricePerKiloExtra: { type: Number, require: true },
        EstimatedDeliveryTime: { type: { String, require: true } },
        status: { type: String, enum: ['enable', 'disable'], default: 'enable' },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true },
)

shipmentServiceSchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = new Date()

    return this.save()
}

shipmentServiceSchema.pre('find', function () {
    this.where({ deletedAt: null })
})

export const shipmentServiceModel = model('shipmentServices', shipmentServiceSchema)
