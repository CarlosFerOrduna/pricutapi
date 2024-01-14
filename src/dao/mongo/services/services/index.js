import {
    ErrorWrapper,
    codes,
    invalidFieldErrorInfo,
} from '../../../../middlewares/errors/index.js'
import { serviceModel } from '../../models/index.js'

export class ServiceService {
    saveService = async ({ service }) => {
        const newService = new serviceModel(service)
        await newService.validate()

        return await newService.save()
    }

    getServiceById = async ({ mid }) => {
        const result = await serviceModel.findById(mid)
        if (!result) {
            ErrorWrapper.createError({
                name: 'service not exists',
                cause: invalidFieldErrorInfo({
                    name: 'service',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get product',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    searchServices = async ({ limit = 10, page = 1, query }) => {
        return await serviceModel.paginate(query, { limit, page, populate: 'category' })
    }

    updateService = async ({ service }) => {
        const result = await serviceModel.findByIdAndUpdate(service._id, service, {
            new: true,
        })
        if (!result) {
            ErrorWrapper.createError({
                name: 'service not exists',
                cause: invalidFieldErrorInfo({
                    name: 'service',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to update product',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    deleteService = async ({ mid }) => {
        const service = await serviceModel.findById(mid)
        if (!service) {
            ErrorWrapper.createError({
                name: 'service not exists',
                cause: invalidFieldErrorInfo({
                    name: 'service',
                    type: 'string',
                    value: service,
                }),
                message: 'Error to get product',
                code: codes.DATABASE_ERROR,
            })
        }

        const result = await service.softDelete()

        return result
    }
}
