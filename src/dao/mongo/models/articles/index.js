import moment from 'moment'
import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const articleSchema = new Schema(
    {
        title: { type: String, required: true },
        summary: { type: String, required: true },
        body: { type: String, required: true },
        urlImageSmall: { type: String },
        urlImageLarge: { type: String },
        link: { type: String }, // todo: preguntar a andy como quiere guardar esto
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date },
    },
    { timestamps: true },
)

articleSchema.plugin(paginate)

articleSchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = moment()

    return this.save()
}

articleSchema.pre('find', function () {
    this.where({ deletedAt: null })
})

export const articleModel = model('articles', articleSchema)
