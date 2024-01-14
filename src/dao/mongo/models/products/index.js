import moment from 'moment'
import { model, Schema } from 'mongoose'

const productSchema = new Schema(
    {
        material: { type: Schema.Types.ObjectId, ref: 'materials', require: true },
        code: { type: String, require: true },
        pricePerPlank: { type: Number, require: true },
        priceSalePlank: { type: Number, require: true },
        width: { type: Number, require: true },
        height: { type: Number, require: true },
        thickness: { type: Number, require: true },
        area: { type: Number, require: true },
        volume: { type: Number, require: true },
        specificWeight: { type: Number, require: true },
        priceSquareCm: { type: Number, require: true },
        fiberLaser: { type: Boolean, default: false },
        CO2Laser: { type: Boolean, default: false },
        CNCRouter: { type: Boolean, default: false },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date },
    },
    { timestamps: true },
)

productSchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = moment()

    return this.save()
}

export const productModel = model('products', productSchema)
