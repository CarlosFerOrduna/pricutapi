import { ShippingController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class ShippingRouter extends BaseRouter {
    init() {
        this.shippingController = new ShippingController()

        this.get('/', ['public'], this.shippingController.searchShippings)
        this.get('/:sid', ['public'], this.shippingController.getShippingById)
        this.post('/', ['public'], this.shippingController.saveShipping)
        this.put('/:sid', ['public'], this.shippingController.updateShipping)
        this.delete('/:sid', ['public'], this.shippingController.deleteShipping)
    }
}
