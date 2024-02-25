import { MaterialController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class MaterialRouter extends BaseRouter {
    init() {
        this.materialController = new MaterialController()

        this.get('/', ['public'], this.materialController.searchMaterials)
        this.get('/:mid', ['public'], this.materialController.getMaterialById)
        this.post('/', ['admin'], this.materialController.saveMaterial)
        this.put('/:mid', ['admin'], this.materialController.updateMaterial)
        this.delete('/:mid', ['admin'], this.materialController.deleteMaterial)
    }
}
