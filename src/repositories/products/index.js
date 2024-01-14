import { productDAO } from '../../dao/index.js'
import { CreateProduct, SelectProduct, UpdateProduct } from '../../dao/dtos/index.js'

export class ProductRepository {
    constructor() {
        this.dao = productDAO
    }

    saveProduct = async ({ product }) => {
        const createProduct = new CreateProduct(product)
        const productCreated = await this.dao.saveProduct({ createProduct })

        return new SelectProduct(productCreated)
    }

    getProductById = async ({ pid }) => {
        const product = await this.dao.getProductById({ pid })

        return new SelectProduct(product)
    }

    searchProducts = async ({ limit, page, query }) => {
        const {
            docs,
            totalPages,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        } = await this.dao.searchProducts({ limit, page, query })

        return {
            products: docs.map((a) => new SelectProduct(a)),
            totalPages,
            page,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        }
    }

    updateProduct = async ({ product }) => {
        const updateProduct = new UpdateProduct(product)
        const productUpdated = await this.dao.updateProduct({ updateProduct })

        return new SelectProduct(productUpdated)
    }

    deleteProduct = async ({ pid }) => {
        return await this.dao.deleteProduct({ pid })
    }
}
