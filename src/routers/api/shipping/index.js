import { MaterialController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class MaterialRouter extends BaseRouter {
    init() {
        this.materialController = new MaterialController()

        this.get('/', ['public'], this.materialController.searchMaterials)
        this.get('/:mid', ['public'], this.materialController.getMaterialById)
        this.post('/', ['public'], this.materialController.saveMaterial)
        this.put('/:mid', ['public'], this.materialController.updateMaterial)
        this.delete('/:mid', ['public'], this.materialController.deleteMaterial)
    }
}
