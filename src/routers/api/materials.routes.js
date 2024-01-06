import materialController from '../../controllers/materials.controller.js'
import BaseRouter from './base.js'

class MaterialRouter extends BaseRouter {
    init() {
        this.get('/', ['public'], materialController.searchMaterials)
        this.get('/:fid', ['public'], materialController.getMaterialById)
        this.post('/', ['public'], materialController.saveMaterial)
        this.put('/:fid', ['public'], materialController.updateMaterial)
        this.delete('/:fid', ['public'], materialController.deleteMaterial)
    }
}

const materialRouter = new MaterialRouter()

export default materialRouter
