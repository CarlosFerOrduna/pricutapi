import { ShipmentController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class ShipmentRouter extends BaseRouter {
    init() {
        this.shipmentController = new ShipmentController()

        this.get('/', ['public'], this.shipmentController.searchShipments)
        this.get('/:sid', ['public'], this.shipmentController.getShipmentById)
        this.post('/', ['admin'], this.shipmentController.saveShipment)
        this.put('/:sid', ['admin'], this.shipmentController.updateShipment)
        this.delete('/:sid', ['admin'], this.shipmentController.deleteShipment)
    }
}
