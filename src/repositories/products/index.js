import { productDAO } from '../../dao/index.js'
import { CreateProduct, SelectProduct, UpdateProduct } from '../../dao/dtos/index.js'

export class ProductRepository {
    constructor() {
        this.dao = productDAO
    }

    saveProduct = async ({ product }) => {
        const createProduct = new CreateProduct(product)
        const productCreated = await this.dao.saveProduct({ product: createProduct })

        return new SelectProduct(productCreated)
    }

    getProductById = async ({ pid }) => {
        const product = await this.dao.getProductById({ pid })

        return new SelectProduct(product)
    }

    searchProducts = async ({ query }) => {
        return await this.dao.searchProducts({ query })
    }

    updateProduct = async ({ product }) => {
        const updateProduct = new UpdateProduct(product)
        const productUpdated = await this.dao.updateProduct({ product: updateProduct })

        return new SelectProduct(productUpdated)
    }

    deleteProduct = async ({ pid }) => {
        return await this.dao.deleteProduct({ pid })
    }
}
