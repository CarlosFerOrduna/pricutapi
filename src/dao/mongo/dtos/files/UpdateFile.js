import {
    ErrorWrapper,
    codes,
    invalidFieldErrorInfo
} from '../../../../middlewares/errors/index.js'

export class UpdateFile {
    constructor(file) {
        this._id =
            file._id ||
            ErrorWrapper.createError({
                name: '_id is not valid',
                cause: invalidFieldErrorInfo({ name: '_id', type: 'string', value: _id }),
                message: 'Error to update file',
                code: codes.INVALID_TYPES_ERROR
            })
        if (file.name) this.name = file.name
        if (file.file) this.file = file.file
        if (file.url) this.url = file.url
    }
}
