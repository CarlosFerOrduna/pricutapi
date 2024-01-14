import {
    ErrorWrapper,
    codes,
    invalidFieldErrorInfo,
} from '../../../../middlewares/errors/index.js'
import { shippingModel } from '../../models/index.js'

export class ShippingService {
    saveShipping = async ({ shipping }) => {
        const newShipping = new shippingModel(shipping)
        await newShipping.validate()

        return await newShipping.save()
    }

    getShippingById = async ({ sid }) => {
        const result = await shippingModel.findById(sid).populate('cityOrigin cityDestination')
        if (!result) {
            ErrorWrapper.createError({
                name: 'shipping not exists',
                cause: invalidFieldErrorInfo({
                    name: 'shipping',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get product',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    searchShippings = async ({ limit = 10, page = 1, query }) => {
        return await shippingModel.paginate(query, {
            limit,
            page,
            populate: 'cityOrigin cityDestination',
        })
    }

    updateShipping = async ({ shipping }) => {
        const result = await shippingModel.findByIdAndUpdate(shipping._id, shipping, {
            new: true,
        })
        if (!result) {
            ErrorWrapper.createError({
                name: 'shipping not exists',
                cause: invalidFieldErrorInfo({
                    name: 'shipping',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to update product',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    deleteShipping = async ({ sid }) => {
        const shipping = await shippingModel.findById(sid)
        if (!shipping) {
            ErrorWrapper.createError({
                name: 'shipping not exists',
                cause: invalidFieldErrorInfo({
                    name: 'shipping',
                    type: 'string',
                    value: shipping,
                }),
                message: 'Error to get product',
                code: codes.DATABASE_ERROR,
            })
        }

        const result = await shipping.softDelete()

        return result
    }
}
