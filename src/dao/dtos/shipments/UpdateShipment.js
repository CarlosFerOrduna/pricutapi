import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../../middlewares/errors/index.js'

export class UpdateShipment {
    constructor(shipment) {
        this._id =
            shipment._id ||
            ErrorWrapper.createError({
                name: '_id is not valid',
                cause: invalidFieldErrorInfo({ name: '_id', type: 'string', value: _id }),
                message: 'Error to update shipping',
                code: codes.INVALID_TYPES_ERROR,
            })
        if (shipment.cityOrigin) this.cityOrigin = shipment.cityOrigin
        if (shipment.cityDestination) this.cityDestination = shipment.cityDestination
        if (shipment.weight) this.weight = shipment.weight
        if (shipment.long) this.long = shipment.long
        if (shipment.high) this.high = shipment.high
        if (shipment.width) this.width = shipment.width
        if (shipment.price) this.price = shipment.price
    }
}
