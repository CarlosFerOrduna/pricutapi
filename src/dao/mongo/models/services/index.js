import moment from 'moment/moment'
import { model, Schema } from 'mongoose'

const serviceSchema = new Schema(
    {
        name: { type: String, require: true },
        description: { type: String, require: true },
        cuttingCapacity: { type: String, require: true },
        supportedThickness: { type: String, require: true },
        about: { type: String },
        aboutImage: { type: String },
        commonUses: { type: String },
        commonUsesImage: { type: String },
        urlImageSmall: { type: String },
        urlImageLarge: { type: String },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date },
    },
    { timestamps: true },
)

serviceSchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = moment()

    return this.save()
}

serviceSchema.pre('find', function () {
    this.where({ deletedAt: null })
})

export const serviceModel = model('services', serviceSchema)
