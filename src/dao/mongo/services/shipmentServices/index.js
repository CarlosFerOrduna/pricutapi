import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../../../middlewares/errors/index.js'
import { shipmentServiceModel } from '../../models/index.js'

export class ShipmentServiceService {
    saveShipmentService = async ({ shipmentService }) => {
        const newShipmentService = new shipmentServiceModel(shipmentService)
        await newShipmentService.validate()

        return await newShipmentService.save()
    }

    getShipmentServiceById = async ({ sid }) => {
        const result = await shipmentServiceModel.findById(sid).populate('cityOrigin cityDestination')
        if (!result) {
            ErrorWrapper.createError({
                name: 'shipmentService not exists',
                cause: invalidFieldErrorInfo({
                    name: 'shipmentService',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get product',
                code: codes.NOT_FOUND,
            })
        }

        return result
    }

    searchShipmentServices = async ({ query }) => {
        return await shipmentServiceModel.find(query).populate('city')
    }

    updateShipmentService = async ({ shipmentService }) => {
        const result = await shipmentServiceModel.findByIdAndUpdate(shipmentService._id, shipmentService, {
            new: true,
        })
        if (!result) {
            ErrorWrapper.createError({
                name: 'shipmentService not exists',
                cause: invalidFieldErrorInfo({
                    name: 'shipmentService',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to update product',
                code: codes.NOT_FOUND,
            })
        }

        return result
    }

    deleteShipmentService = async ({ sid }) => {
        const shipmentService = await shipmentServiceModel.findById(sid)
        if (!shipmentService) {
            ErrorWrapper.createError({
                name: 'shipmentService not exists',
                cause: invalidFieldErrorInfo({
                    name: 'shipmentService',
                    type: 'string',
                    value: shipmentService,
                }),
                message: 'Error to get product',
                code: codes.NOT_FOUND,
            })
        }

        const result = await shipmentService.softDelete()

        return result
    }
}
