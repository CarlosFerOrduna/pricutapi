import {
    ErrorWrapper,
    codes,
    invalidFieldErrorInfo
} from '../../../../middlewares/errors/index.js'

export class UpdateCity {
    constructor(city) {
        this._id =
            city._id ||
            ErrorWrapper.createError({
                name: '_id is not valid',
                cause: invalidFieldErrorInfo({ name: '_id', type: 'string', value: _id }),
                message: 'Error to update city',
                code: codes.INVALID_TYPES_ERROR
            })
        if (city.key) this.key = city.key
        if (city.value) this.value = city.value
    }
}
