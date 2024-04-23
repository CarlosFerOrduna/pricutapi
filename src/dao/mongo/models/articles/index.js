import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const articleSchema = new Schema(
    {
        title: { type: String, required: true, index: true },
        summary: { type: String, required: true },
        body: { type: String, required: true },
        urlImageSmall: { type: String },
        urlImageLarge: { type: String },
        link: { type: String }, // todo: preguntar a andy como quiere guardar esto
        status: { type: String, enum: ['enable', 'disable'], default: 'enable' },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true },
)

articleSchema.plugin(paginate)

articleSchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = new Date()

    return this.save()
}

articleSchema.pre('find', function () {
    this.where({ deletedAt: null })
})

articleSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
})

export const articleModel = model('articles', articleSchema)
