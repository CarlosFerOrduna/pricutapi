import { CategoryController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class CategoryRouter extends BaseRouter {
    init() {
        this.categoryController = new CategoryController()

        this.get('/', ['public'], this.categoryController.searchCategories)
        this.get('/:cid', ['public'], this.categoryController.getCategoryById)
        this.post('/', ['admin'], this.categoryController.saveCategory)
        this.put('/:cid', ['admin'], this.categoryController.updateCategory)
        this.delete('/:cid', ['admin'], this.categoryController.deleteCategory)
    }
}
