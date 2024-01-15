import { CategoryController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class CategoryRouter extends BaseRouter {
    init() {
        this.categoryController = new CategoryController()

        this.get('/', ['public'], this.categoryController.searchCategories)
        this.get('/:cid', ['public'], this.categoryController.getCategoryById)
        this.post('/', ['public'], this.categoryController.saveCategory)
        this.put('/:cid', ['public'], this.categoryController.updateCategory)
        this.delete('/:cid', ['public'], this.categoryController.deleteCategory)
    }
}
