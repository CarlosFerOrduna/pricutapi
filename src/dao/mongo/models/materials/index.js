import { model, Schema } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const materialSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    category: { type: Schema.Types.ObjectId, ref: 'categories', require: true },
    price: { type: Number, require: true },
    thickness: { type: String, require: true },
    areaStandard: { type: Number, require: true, default: 900 },
    weightAtomic: { type: Number, require: true },
    characteristics: { type: [String], default: [], require: true },
    urlImage: { type: String }
})

materialSchema.plugin(paginate)

export const materialModel = model('materials', materialSchema)
