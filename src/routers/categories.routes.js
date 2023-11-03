import categoryController from '../controllers/categories.controller.js'
import BaseRouter from './base.routes.js'

class CategoryRouter extends BaseRouter {
    init() {
        this.get('/', ['public'], categoryController.getCategories)
        this.get('/:fid', ['public'], categoryController.getCategoryById)
        this.post('/', ['public'], categoryController.saveCategory)
        this.put('/:fid', ['public'], categoryController.updateCategory)
        this.delete('/:fid', ['public'], categoryController.deleteCategory)
    }
}

const categoryRouter = new CategoryRouter()

export default categoryRouter
