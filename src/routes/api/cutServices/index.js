import { CutServiceController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class CutServiceRouter extends BaseRouter {
    init() {
        this.cutServiceController = new CutServiceController()

        this.get('/', ['public'], this.cutServiceController.searchCutServices)
        this.get('/:csid', ['public'], this.cutServiceController.getCutServiceById)
        this.post('/', ['admin'], this.cutServiceController.saveCutService)
        this.put('/:csid', ['admin'], this.cutServiceController.updateCutService)
        this.delete('/:csid', ['admin'], this.cutServiceController.deleteCutService)
    }
}
