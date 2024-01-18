import { ServiceController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class ServiceRouter extends BaseRouter {
    init() {
        this.serviceController = new ServiceController()

        this.get('/:sid', ['public'], this.serviceController.getServiceById)
        this.get('/', ['public'], this.serviceController.searchServices)
        this.post('/', ['public'], this.serviceController.saveService)
        this.put('/:sid', ['public'], this.serviceController.updateService)
        this.delete('/:sid', ['public'], this.serviceController.deleteService)
    }
}
