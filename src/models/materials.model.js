import { model, Schema } from 'mongoose'
import { paginate } from 'mongoose-paginate-v2'

const materialSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'categories', required: true },
    price: { type: Number, required: true },
    thickness: { type: String, required: true },
    areaStandard: { type: Number, required: true, default: 900 }
})

materialSchema.plugin(paginate)

const materialModel = model('materials', materialSchema)

export default materialModel
