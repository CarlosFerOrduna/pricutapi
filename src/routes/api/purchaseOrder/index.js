import { PurchaseOrderController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class PurchaseOrderRouter extends BaseRouter {
    init() {
        this.purchaseOrderController = new PurchaseOrderController()

        this.get('/', ['public'], this.purchaseOrderController.searchPurchaseOrders)
        this.get('/:poid', ['public'], this.purchaseOrderController.getPurchaseOrderById)
        this.post('/:sid:fid:pid', ['public'], this.purchaseOrderController.savePurchaseOrder)
        this.put('/:poid', ['admin'], this.purchaseOrderController.updatePurchaseOrder)
        this.delete('/:poid', ['admin'], this.purchaseOrderController.deletePurchaseOrder)
    }
}
