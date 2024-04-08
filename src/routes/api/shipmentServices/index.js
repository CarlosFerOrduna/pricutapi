import { ShipmentServiceController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class ShipmentServiceRouter extends BaseRouter {
    init() {
        this.shipmentServiceController = new ShipmentServiceController()

        this.get('/', ['public'], this.shipmentServiceController.searchShipmentServices)
        this.get('/:ssid', ['public'], this.shipmentServiceController.getShipmentServiceById)
        this.post('/', ['admin'], this.shipmentServiceController.saveShipmentService)
        this.put('/:ssid', ['admin'], this.shipmentServiceController.updateShipmentService)
        this.delete('/:ssid', ['admin'], this.shipmentServiceController.deleteShipmentService)
    }
}
