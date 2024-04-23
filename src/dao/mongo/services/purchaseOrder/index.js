import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../../../middlewares/errors/index.js'
import { purchaseOrderModel } from '../../models/index.js'

export class PurchaseOrderService {
    savePurchaseOrder = async ({ purchaseOrder }) => {
        const newPurchaseOrder = new purchaseOrderModel(purchaseOrder)
        await newPurchaseOrder.validate()

        return await newPurchaseOrder.save()
    }

    getPurchaseOrderById = async ({ poid }) => {
        const result = await purchaseOrderModel.findById(poid).populate('shipments')
        if (!result) {
            ErrorWrapper.createError({
                name: 'purchaseOrder not exists',
                cause: invalidFieldErrorInfo({
                    name: 'purchaseOrder',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get purchaseOrder',
                code: codes.NOT_FOUND,
            })
        }

        return result
    }

    searchPurchaseOrders = async ({ query }) => {
        return await purchaseOrderModel.find(query).populate('shipments')
    }

    updatePurchaseOrder = async ({ purchaseOrder }) => {
        const result = await purchaseOrderModel.findByIdAndUpdate(purchaseOrder._id, purchaseOrder, {
            new: true,
        })
        if (!result) {
            ErrorWrapper.createError({
                name: 'purchaseOrder not exists',
                cause: invalidFieldErrorInfo({
                    name: 'purchaseOrder',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to update purchaseOrder',
                code: codes.NOT_FOUND,
            })
        }

        return result
    }

    deletePurchaseOrder = async ({ poid }) => {
        const purchaseOrder = await purchaseOrderModel.findById(poid)
        if (!purchaseOrder) {
            ErrorWrapper.createError({
                name: 'purchaseOrder not exists',
                cause: invalidFieldErrorInfo({
                    name: 'purchaseOrder',
                    type: 'string',
                    value: purchaseOrder,
                }),
                message: 'Error to delete purchaseOrder',
                code: codes.NOT_FOUND,
            })
        }

        const result = await purchaseOrder.softDelete()

        return result
    }
}
