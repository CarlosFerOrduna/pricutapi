import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../../../middlewares/errors/index.js'
import { shipmentModel } from '../../models/index.js'

export class ShipmentService {
    saveShipment = async ({ shipment }) => {
        const newShipment = new shipmentModel(shipment)
        await newShipment.validate()

        return await newShipment.save()
    }

    getShipmentById = async ({ sid }) => {
        const result = await shipmentModel.findById(sid).populate('city shipmentServices')
        if (!result) {
            ErrorWrapper.createError({
                name: 'shipment not exists',
                cause: invalidFieldErrorInfo({
                    name: 'shipment',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get product',
                code: codes.NOT_FOUND,
            })
        }

        return result
    }

    searchShipments = async ({ limit = 10, page = 1, query }) => {
        return await shipmentModel.paginate(query, {
            limit,
            page,
            populate: 'city shipmentServices',
        })
    }

    updateShipment = async ({ shipment }) => {
        const result = await shipmentModel.findByIdAndUpdate(shipment._id, shipment, {
            new: true,
        })
        if (!result) {
            ErrorWrapper.createError({
                name: 'shipment not exists',
                cause: invalidFieldErrorInfo({
                    name: 'shipment',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to update product',
                code: codes.NOT_FOUND,
            })
        }

        return result
    }

    deleteShipment = async ({ sid }) => {
        const shipment = await shipmentModel.findById(sid)
        if (!shipment) {
            ErrorWrapper.createError({
                name: 'shipment not exists',
                cause: invalidFieldErrorInfo({
                    name: 'shipment',
                    type: 'string',
                    value: shipment,
                }),
                message: 'Error to get product',
                code: codes.NOT_FOUND,
            })
        }

        const result = await shipment.softDelete()

        return result
    }
}
