import {
    ErrorWrapper,
    codes,
    invalidFieldErrorInfo,
} from '../../../../middlewares/errors/index.js'
import { productModel } from '../../models/index.js'

export class ProductService {
    saveProduct = async ({ product }) => {
        const newProduct = new productModel(product)
        await newProduct.validate()

        return await newProduct.save()
    }

    getProductById = async ({ mid }) => {
        const result = await productModel.findById(mid).populate('material')
        if (!result) {
            ErrorWrapper.createError({
                name: 'product not exists',
                cause: invalidFieldErrorInfo({
                    name: 'product',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get product',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    searchProducts = async ({ query }) => {
        return await productModel.find(query).populate('material')
    }

    updateProduct = async ({ product }) => {
        const result = await productModel.findByIdAndUpdate(product._id, product, {
            new: true,
        })
        if (!result) {
            ErrorWrapper.createError({
                name: 'product not exists',
                cause: invalidFieldErrorInfo({
                    name: 'product',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to update product',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    deleteProduct = async ({ mid }) => {
        const product = await productModel.findById(mid)
        if (!product) {
            ErrorWrapper.createError({
                name: 'product not exists',
                cause: invalidFieldErrorInfo({
                    name: 'product',
                    type: 'string',
                    value: product,
                }),
                message: 'Error to delete product',
                code: codes.DATABASE_ERROR,
            })
        }

        const result = await product.softDelete()

        return result
    }
}
