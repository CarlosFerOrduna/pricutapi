import moment from 'moment'
import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const fileSchema = new Schema(
    {
        name: { type: String, required: true },
        file: { type: Buffer, required: true },
        url: { type: String, required: true },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date },
    },
    { timestamps: true },
)

fileSchema.plugin(paginate)

fileSchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = moment()

    return this.save()
}

fileSchema.pre('find', function () {
    this.where({ deletedAt: null })
})

export const fileModel = model('files', fileSchema)
