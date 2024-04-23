import { model, Schema } from 'mongoose'
import envs from '../../../../config/index'

const purchaseOrderSchema = new Schema(
    {
        sellerCompanyName: { type: String },
        sellerDeliveryAddress: { type: String },
        sellerTax: { type: String },
        sellerFiscalAddress: { type: String },
        sellerEmail: { type: String },
        sellerTel: { type: String },
        purchaserFullName: { type: String, required: true },
        purchaserDeliveryAddress: { type: String, required: true },
        purchaserEmail: { type: String },
        purchaserTel: { type: String },
        additionalData: { type: String },
        productImageUrl: { type: String, required: true },
        productDescription: { type: String, required: true },
        productPrice: { type: Number, required: true },
        shipmentInformation: { type: Schema.Types.ObjectId, ref: 'shipments', required: true },
        shipmentPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        status: { type: String, enum: ['enable', 'disable'], default: 'enable' },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    },
)

purchaseOrderSchema.pre('save', function () {
    this.sellerCompanyName = 'pricut-test'
    this.sellerDeliveryAddress = 'address-pricut'
    this.sellerTax = 'cuit/ruc-pricut'
    this.sellerFiscalAddress = 'fiscal-pricut'
    this.sellerEmail = envs.mailer.auth.user
    this.sellerTel = '+111 1111111111'
})

purchaseOrderSchema.methods.softDelete = async function () {
    this.deleted = true
    this.deletedAt = new Date()

    return this.save()
}

purchaseOrderSchema.pre('find', function () {
    this.where({ deletedAt: null })
})

purchaseOrderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
})

export const purchaseOrderModel = model('purchaseOrders', purchaseOrderSchema)
