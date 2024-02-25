import { ServiceController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class ServiceRouter extends BaseRouter {
    init() {
        this.serviceController = new ServiceController()

        this.get('/:sid', ['public'], this.serviceController.getServiceById)
        this.get('/', ['public'], this.serviceController.searchServices)
        this.post('/', ['admin'], this.serviceController.saveService)
        this.put('/:sid', ['admin'], this.serviceController.updateService)
        this.delete('/:sid', ['admin'], this.serviceController.deleteService)
    }
}
