import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../../../middlewares/errors'

export class UpdateUser {
    constructor(user) {
        this._id =
            user._id ||
            ErrorWrapper.createError({
                name: '_id is not valid',
                cause: invalidFieldErrorInfo({ name: '_id', type: 'string', value: _id }),
                message: 'Error to update user',
                code: codes.INVALID_TYPES_ERROR
            })
        if (user.firstName) this.firstName = user.firstName
        if (user.lastName) this.lastName = user.lastName
        if (user.email) this.email = user.email
        if (user.password) this.password = user.password
        if (user.rol) this.rol = user.rol
        if (user.files) this.files = user.files
        if (user.thumbnail) this.thumbnail = user.thumbnail
    }
}
