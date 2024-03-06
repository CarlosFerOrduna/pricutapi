import { Schema, model } from 'mongoose'

const citySchema = new Schema(
    {
        name: { type: String, required: true, unique: true, index: true },
        shipmentService: { type: Schema.Types.ObjectId, require: true, ref: 'shipmentServices' },
        status: { type: String, enum: ['enable', 'disable'], default: 'enable' },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true },
)

citySchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = new Date()

    return this.save()
}

citySchema.pre('find', function () {
    this.where({ deletedAt: null })
})

export const cityModel = model('cities', citySchema)
