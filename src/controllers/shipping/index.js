import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { ShippingRepository } from '../../repositories/index.js'

export class ShippingController {
    constructor() {
        this.shippingRepository = new ShippingRepository()
    }

    // todo: cranear
    saveShipping = async (req, res) => {
        const { cityOrigin, cityDestination, weight, long, high, width, price } = req.body
        if (!cityOrigin) {
            ErrorWrapper.createError({
                name: 'cityOrigin is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'cityOrigin',
                    type: 'string',
                    value: cityOrigin,
                }),
                message: 'Error to save shipping',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!cityDestination) {
            ErrorWrapper.createError({
                name: 'cityDestination is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'cityDestination',
                    type: 'string',
                    value: cityDestination,
                }),
                message: 'Error to save shipping',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!weight) {
            ErrorWrapper.createError({
                name: 'weight is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'weight',
                    type: 'string',
                    value: weight,
                }),
                message: 'Error to save shipping',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!long) {
            ErrorWrapper.createError({
                name: 'long is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'long',
                    type: 'string',
                    value: long,
                }),
                message: 'Error to save shipping',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!high) {
            ErrorWrapper.createError({
                name: 'high is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'high',
                    type: 'string',
                    value: high,
                }),
                message: 'Error to save shipping',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!width) {
            ErrorWrapper.createError({
                name: 'width is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'width',
                    type: 'string',
                    value: width,
                }),
                message: 'Error to save shipping',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!price) {
            ErrorWrapper.createError({
                name: 'price is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'price',
                    type: 'string',
                    value: price,
                }),
                message: 'Error to save shipping',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.shippingRepository.saveShipping({
            shipping: {
                cityOrigin,
                cityDestination,
                weight,
                long,
                high,
                width,
                price,
            },
        })

        return res.status(201).send({
            status: 'success',
            message: 'shipping successfully created',
            data: result,
        })
    }

    getShippingById = async (req, res) => {
        const { sid } = req.params
        if (!sid || !isNaN(sid)) {
            ErrorWrapper.createError({
                name: 'sid is required, or is not valid',
                cause: invalidFieldErrorInfo({ name: 'sid', type: 'string', value: sid }),
                message: 'Error to get shipping',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.shippingRepository.getShippingById({ sid })

        return res.status(200).send({
            status: 'success',
            message: 'shipping successfully found',
            data: result,
        })
    }

    searchShippings = async (req, res) => {
        const { limit, page, cityOrigin, cityDestination, weight, long, high, width, price } = req.query

        let query = {}
        if (cityOrigin) query.cityOrigin = cityOrigin
        if (cityDestination) query.cityDestination = cityDestination
        if (weight) query.weight = weight
        if (long) query.long = long
        if (high) query.high = high
        if (width) query.width = width
        if (price) query.price = price

        const result = await this.shippingRepository.searchShippings({ limit, page, query })

        return res.status(200).send({
            status: 'success',
            message: 'all shipping',
            data: result,
        })
    }

    updateShipping = async (req, res) => {
        const { cityOrigin, cityDestination, weight, long, high, width, price } = req.query
        const { sid } = req.params
        if (!sid || !isNaN(sid)) {
            ErrorWrapper.createError({
                name: 'sid is required, or is not valid',
                cause: invalidFieldErrorInfo({ name: 'sid', type: 'string', value: sid }),
                message: 'Error to update shipping',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        let query = { _id: sid }
        if (cityOrigin) query.cityOrigin = cityOrigin
        if (cityDestination) query.cityDestination = cityDestination
        if (weight) query.weight = weight
        if (long) query.long = long
        if (high) query.high = high
        if (width) query.width = width
        if (price) query.price = price

        const result = await this.shippingRepository.updateShipping({ query })

        return res.status(200).send({
            status: 'success',
            message: 'shipping successfully updated',
            data: result,
        })
    }

    deleteShipping = async (req, res) => {
        const { sid } = req.params
        if (!sid) {
            ErrorWrapper.createError({
                name: 'sid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'sid',
                    type: 'string',
                    value: sid,
                }),
                message: 'Error to delete shipping',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        await this.shippingRepository.deleteShipping({ sid })

        return res.status(204).send()
    }
}
