import moment from 'moment/moment'
import { model, Schema } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const materialSchema = new Schema(
    {
        name: { type: String, require: true },
        description: { type: String, require: true },
        about: { type: String },
        aboutImage: { type: String },
        category: { type: Schema.Types.ObjectId, ref: 'categories', require: true },
        commonUses: { type: String },
        commonUsesImage: { type: String },
        urlImageSmall: { type: String },
        urlImageLarge: { type: String },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date },
    },
    { timestamps: true },
)

materialSchema.plugin(paginate)

materialSchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = moment()

    return this.save()
}

materialSchema.pre('find', function () {
    this.where({ deletedAt: null })
})

export const materialModel = model('materials', materialSchema)
