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
        if (shipment.city) this.city = shipment.city
        if (shipment.shipmentService) this.shipmentService = shipment.shipmentService
        if (shipment.streetName) this.streetName = shipment.streetName
        if (shipment.streetNumber) this.streetNumber = shipment.streetNumber
        if (shipment.floor) this.floor = shipment.floor
        if (shipment.apartment) this.apartment = shipment.apartment
        if (shipment.zipCode) this.zipCode = shipment.zipCode
        if (shipment.weight) this.weight = shipment.weight
        if (shipment.long) this.long = shipment.long
        if (shipment.high) this.high = shipment.high
        if (shipment.width) this.width = shipment.width
        if (shipment.price) this.price = shipment.price
        if (shipment.deliveryStatus) this.deliveryStatus = shipment.deliveryStatus
    }
}
