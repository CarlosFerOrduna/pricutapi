import { model, Schema } from 'mongoose'

const serviceSchema = new Schema(
    {
        name: { type: String, require: true, index: true },
        description: { type: String, require: true },
        cuttingCapacity: { type: String, require: true },
        supportedThickness: { type: String, require: true },
        about: { type: String },
        aboutImage: { type: String },
        commonUses: { type: String },
        commonUsesImage: { type: String },
        urlImageSmall: { type: String },
        urlImageLarge: { type: String },
        status: { type: String, enum: ['enable', 'disable'], default: 'enable' },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true },
)

serviceSchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = new Date()

    return this.save()
}

serviceSchema.pre('find', function () {
    this.where({ deletedAt: null })
})

export const serviceModel = model('services', serviceSchema)
