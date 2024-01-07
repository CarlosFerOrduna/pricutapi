import { CategoryController } from '../../../controllers/index.js'
import BaseRouter from '../../entity/base.js'

export class CategoryRouter extends BaseRouter {
    init() {
        this.categoryController = new CategoryController()

        this.get('/', ['public'], this.categoryController.searchCategories)
        this.get('/:fid', ['public'], this.categoryController.getCategoryById)
        this.post('/', ['public'], this.categoryController.saveCategory)
        this.put('/:fid', ['public'], this.categoryController.updateCategory)
        this.delete('/:fid', ['public'], this.categoryController.deleteCategory)
    }
}
