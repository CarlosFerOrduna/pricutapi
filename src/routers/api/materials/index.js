import { MaterialController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class MaterialRouter extends BaseRouter {
    init() {
        this.materialController = new MaterialController()

        this.get('/', ['public'], this.materialController.searchMaterials)
        this.get('/:fid', ['public'], this.materialController.getMaterialById)
        this.post('/', ['public'], this.materialController.saveMaterial)
        this.put('/:fid', ['public'], this.materialController.updateMaterial)
        this.delete('/:fid', ['public'], this.materialController.deleteMaterial)
    }
}
