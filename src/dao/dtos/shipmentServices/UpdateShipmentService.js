import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../../middlewares/errors/index.js'

export class UpdateShipmentService {
    constructor(shipmentService) {
        this._id =
            shipmentService._id ||
            ErrorWrapper.createError({
                name: '_id is not valid',
                cause: invalidFieldErrorInfo({ name: '_id', type: 'string', value: _id }),
                message: 'Error to update shipping',
                code: codes.INVALID_TYPES_ERROR,
            })
        if (shipmentService.name) this.name = shipmentService.name
        if (shipmentService.standardPrice) this.standardPrice = shipmentService.standardPrice
        if (shipmentService.standardWeight) this.standardWeight = shipmentService.standardWeight
        if (shipmentService.pricePerKiloExtra) this.pricePerKiloExtra = shipmentService.pricePerKiloExtra
        if (shipmentService.EstimatedDeliveryTime) this.EstimatedDeliveryTime = shipmentService.EstimatedDeliveryTime
    }
}
