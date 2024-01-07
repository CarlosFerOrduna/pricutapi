import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../../../middlewares/errors'

export class UpdateCategory {
    constructor(category) {
        this._id =
            category._id ||
            ErrorWrapper.createError({
                name: '_id is not valid',
                cause: invalidFieldErrorInfo({ name: '_id', type: 'string', value: _id }),
                message: 'Error to update category',
                code: codes.INVALID_TYPES_ERROR
            })
        if (category.name) this.name = category.name
        if (category.description) this.description = category.description
    }
}
