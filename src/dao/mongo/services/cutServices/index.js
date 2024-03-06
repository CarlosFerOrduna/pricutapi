import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../../../middlewares/errors/index.js'
import { cutServiceModel } from '../../models/index.js'

export class CutServiceService {
    saveService = async ({ service }) => {
        const newService = new cutServiceModel(service)
        await newService.validate()

        return await newService.save()
    }

    getServiceById = async ({ sid }) => {
        const result = await cutServiceModel.findById(sid)
        if (!result) {
            ErrorWrapper.createError({
                name: 'service not exists',
                cause: invalidFieldErrorInfo({
                    name: 'service',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get product',
                code: codes.NOT_FOUND,
            })
        }

        return result
    }

    searchServices = async ({ query }) => {
        return await cutServiceModel.find(query)
    }

    updateService = async ({ service }) => {
        const result = await cutServiceModel.findByIdAndUpdate(service._id, service, {
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
                code: codes.NOT_FOUND,
            })
        }

        return result
    }

    deleteService = async ({ sid }) => {
        const service = await cutServiceModel.findById(sid)
        if (!service) {
            ErrorWrapper.createError({
                name: 'service not exists',
                cause: invalidFieldErrorInfo({
                    name: 'service',
                    type: 'string',
                    value: service,
                }),
                message: 'Error to get product',
                code: codes.NOT_FOUND,
            })
        }

        const result = await service.softDelete()

        return result
    }
}
