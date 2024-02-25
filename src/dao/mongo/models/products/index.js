import { model, Schema } from 'mongoose'
import { categoryModel, materialModel } from '../index.js'

const productSchema = new Schema(
    {
        material: { type: Schema.Types.ObjectId, ref: 'materials', require: true },
        code: { type: String, require: true, index: true },
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
        status: { type: String, enum: ['enable', 'disable'], default: 'enable' },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true },
)

productSchema.pre('save', async function () {
    const material = await materialModel.findById(this.material).lean()
    const category = await categoryModel.findById(material.category).lean()

    const materialName = material.name.toUpperCase().substring(0, 3)
    const categoryName = category.name.toUpperCase().replace(/\s/g, '')

    this.code = `${materialName}-${categoryName}-${this.width}${this.height}-${this.thickness}`
    this.priceSalePlank = this.pricePerPlank * 1.4
    this.area = this.width * this.height
    this.volume = this.width * this.height * this.thickness
    this.priceSquareCm = this.priceSalePlank / this.area
})

productSchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = new Date()

    return this.save()
}

productSchema.pre('find', function () {
    this.where({ deletedAt: null })
})

export const productModel = model('products', productSchema)
