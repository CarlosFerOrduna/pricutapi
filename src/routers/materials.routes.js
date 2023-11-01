import materialController from '../controllers/material.controller.js'
import BaseRouter from './base.routes.js'

class MaterialRouter extends BaseRouter {
    init() {
        this.get('/', ['public'], materialController.getMaterials)
        this.get('/:fid', ['public'], materialController.getMaterialById)
        this.post('/', ['public'], materialController.saveMaterial)
        this.put('/:fid', ['public'], materialController.updateMaterial)
        this.delete('/:fid', ['public'], materialController.deleteMaterial)
    }
}

const materialRouter = new MaterialRouter()

export default materialRouter