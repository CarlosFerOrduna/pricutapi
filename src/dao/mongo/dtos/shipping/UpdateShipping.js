import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../../../middlewares/errors'

export class UpdateShipping {
    constructor(shipping) {
        this._id =
            shipping._id ||
            ErrorWrapper.createError({
                name: '_id is not valid',
                cause: invalidFieldErrorInfo({ name: '_id', type: 'string', value: _id }),
                message: 'Error to update shipping',
                code: codes.INVALID_TYPES_ERROR
            })
        if (shipping.cityOrigin) this.cityOrigin = shipping.cityOrigin
        if (shipping.cityDestination) this.cityDestination = shipping.cityDestination
        if (shipping.weight) this.weight = shipping.weight
        if (shipping.long) this.long = shipping.long
        if (shipping.high) this.high = shipping.high
        if (shipping.width) this.width = shipping.width
        if (shipping.price) this.price = shipping.price
    }
}
