import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const fileSchema = new Schema(
    {
        name: { type: String, required: true, index: true },
        file: { type: Buffer, required: true },
        url: { type: String, required: true },
        status: { type: String, enum: ['enable', 'disable'], default: 'enable' },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true },
)

fileSchema.plugin(paginate)

fileSchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = new Date()

    return this.save()
}

fileSchema.pre('find', function () {
    this.where({ deletedAt: null })
})

fileSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
})

export const fileModel = model('files', fileSchema)
