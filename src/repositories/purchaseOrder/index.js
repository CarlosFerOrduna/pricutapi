import { purchaseOrderDAO } from '../../dao/index.js'
import { CreatePurchaseOrder, SelectPurchaseOrder, UpdatePurchaseOrder } from '../../dao/dtos/index.js'

export class PurchaseOrderRepository {
    constructor() {
        this.dao = purchaseOrderDAO
    }

    savePurchaseOrder = async ({ purchaseOrder }) => {
        const createPurchaseOrder = new CreatePurchaseOrder(purchaseOrder)
        const purchaseOrderCreated = await this.dao.savePurchaseOrder({ purchaseOrder: createPurchaseOrder })

        return new SelectPurchaseOrder(purchaseOrderCreated)
    }

    getPurchaseOrderById = async ({ poid }) => {
        const purchaseOrder = await this.dao.getPurchaseOrderById({ poid })

        return new SelectPurchaseOrder(purchaseOrder)
    }

    searchPurchaseOrders = async ({ query }) => {
        return await this.dao.searchPurchaseOrders({ query })
    }

    updatePurchaseOrder = async ({ purchaseOrder }) => {
        const updatePurchaseOrder = new UpdatePurchaseOrder(purchaseOrder)
        const purchaseOrderUpdated = await this.dao.updatePurchaseOrder({ purchaseOrder: updatePurchaseOrder })

        return new SelectPurchaseOrder(purchaseOrderUpdated)
    }

    deletePurchaseOrder = async ({ poid }) => {
        return await this.dao.deletePurchaseOrder({ poid })
    }
}
