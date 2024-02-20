import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const citiesSchema = new Schema(
    {
        key: { type: Number, required: true, index: true, unique: true },
        value: { type: String, required: true, unique: true },
        status: { type: String, enum: ['enable', 'disable'], default: 'enable' },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true },
)

citiesSchema.plugin(paginate)

citiesSchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = new Date()

    return this.save()
}

citiesSchema.pre('find', function () {
    this.where({ deleted: false })
})

export const cityModel = model('cities', citiesSchema)
