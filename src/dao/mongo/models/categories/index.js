import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const categorySchema = new Schema(
    {
        name: { type: String, required: true, index: true },
        description: { type: String, required: true },
        status: { type: String, enum: ['enable', 'disable'], default: 'enable' },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true },
)

categorySchema.plugin(paginate)

categorySchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = new Date()

    return this.save()
}

categorySchema.pre('find', function () {
    this.where({ deleted: false })
})

export const categoryModel = model('categories', categorySchema)
