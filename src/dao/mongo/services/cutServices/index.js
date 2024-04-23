import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../../../middlewares/errors/index.js'
import { cutServiceModel } from '../../models/index.js'

export class CutServiceService {
    saveCutService = async ({ service }) => {
        const newCutService = new cutServiceModel(service)
        await newCutService.validate()

        return await newCutService.save()
    }

    getCutServiceById = async ({ csid }) => {
        const result = await cutServiceModel.findById(csid)
        if (!result) {
            ErrorWrapper.createError({
                name: 'cutService not exists',
                cause: invalidFieldErrorInfo({
                    name: 'cutService',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get product',
                code: codes.NOT_FOUND,
            })
        }

        return result
    }

    searchCutServices = async ({ query }) => {
        return await cutServiceModel.find(query)
    }

    updateCutService = async ({ cutService }) => {
        const result = await cutServiceModel.findByIdAndUpdate(cutService._id, cutService, {
            new: true,
        })
        if (!result) {
            ErrorWrapper.createError({
                name: 'cutService not exists',
                cause: invalidFieldErrorInfo({
                    name: 'cutService',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to update product',
                code: codes.NOT_FOUND,
            })
        }

        return result
    }

    deleteCutService = async ({ csid }) => {
        const cutService = await cutServiceModel.findById(csid)
        if (!cutService) {
            ErrorWrapper.createError({
                name: 'cutService not exists',
                cause: invalidFieldErrorInfo({
                    name: 'cutService',
                    type: 'string',
                    value: cutService,
                }),
                message: 'Error to get product',
                code: codes.NOT_FOUND,
            })
        }

        const result = await cutService.softDelete()

        return result
    }
}
