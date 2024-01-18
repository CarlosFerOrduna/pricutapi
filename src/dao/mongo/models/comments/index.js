import moment from 'moment'
import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const commentSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
        details: { type: String, required: true },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true },
)

commentSchema.plugin(paginate)

commentSchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = moment()

    return this.save()
}

commentSchema.pre('find', function () {
    this.where({ deletedAt: null })
})

export const commentModel = model('comments', commentSchema)
