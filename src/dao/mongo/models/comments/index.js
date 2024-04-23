import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const commentSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
        details: { type: String, required: true },
        status: { type: String, enum: ['enable', 'disable'], default: 'enable' },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true },
)

commentSchema.plugin(paginate)

commentSchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = new Date()

    return this.save()
}

commentSchema.pre('find', function () {
    this.where({ deletedAt: null })
})

commentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
})

export const commentModel = model('comments', commentSchema)
