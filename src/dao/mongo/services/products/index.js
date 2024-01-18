import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../../../middlewares/errors/index.js'
import { productModel } from '../../models/index.js'

export class ProductService {
    saveProduct = async ({ product }) => {
        const newProduct = new productModel(product)
        await newProduct.validate()

        return await newProduct.save()
    }

    getProductById = async ({ pid }) => {
        const result = await productModel.findById(pid).populate('material')
        if (!result) {
            ErrorWrapper.createError({
                name: 'product not exists',
                cause: invalidFieldErrorInfo({
                    name: 'product',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get product',
                code: codes.NOT_FOUND,
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
                code: codes.NOT_FOUND,
            })
        }

        return result
    }

    deleteProduct = async ({ pid }) => {
        const product = await productModel.findById(pid)
        if (!product) {
            ErrorWrapper.createError({
                name: 'product not exists',
                cause: invalidFieldErrorInfo({
                    name: 'product',
                    type: 'string',
                    value: product,
                }),
                message: 'Error to delete product',
                code: codes.NOT_FOUND,
            })
        }

        const result = await product.softDelete()

        return result
    }
}
