import { ProductController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class ProductRouter extends BaseRouter {
    init() {
        this.productController = new ProductController()

        this.get('/', ['public'], this.productController.searchProducts)
        this.get('/:pid', ['public'], this.productController.getProductById)
        this.post('/', ['public'], this.productController.saveProduct)
        this.put('/:pid', ['public'], this.productController.updateProduct)
        this.delete('/:pid', ['public'], this.productController.deleteProduct)
    }
}
