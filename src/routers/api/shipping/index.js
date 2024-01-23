import { ShippingController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class ShippingRouter extends BaseRouter {
    init() {
        this.shippingController = new ShippingController()

        this.get('/', ['public'], this.shippingController.searchShippings)
        this.get('/:mid', ['public'], this.shippingController.getShippingById)
        this.post('/', ['public'], this.shippingController.saveShipping)
        this.put('/:mid', ['public'], this.shippingController.updateShipping)
        this.delete('/:mid', ['public'], this.shippingController.deleteShipping)
    }
}