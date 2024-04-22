import { Schema, model } from 'mongoose'

const shipmentSchema = new Schema(
    {
        city: { type: String, require: true },
        shipmentService: { type: String, require: true },
        streetName: { type: String, require: true },
        streetNumber: { type: Number, require: true },
        floor: { type: String, default: null },
        apartment: { type: String, default: null },
        zipCode: { type: String, default: null },
        weight: { type: Number, require: true },
        long: { type: Number, require: true },
        high: { type: Number, require: true },
        width: { type: Number, require: true },
        price: { type: Number, require: true },
        deliveryStatus: {
            type: String,
            enum: ['pending', 'delivered', 'delayed', 'rejected', 'cancelled', 'rescheduled'],
            default: 'pending',
        },
        status: { type: String, enum: ['enable', 'disable'], default: 'enable' },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true },
)

shipmentSchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = new Date()

    return this.save()
}

shipmentSchema.pre('find', function () {
    this.where({ deletedAt: null })
})

shipmentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
})

export const shipmentModel = model('shipments', shipmentSchema)
