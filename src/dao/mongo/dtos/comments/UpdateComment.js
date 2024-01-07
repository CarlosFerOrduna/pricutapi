import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../../../middlewares/errors'

export class UpdateComment {
    constructor(comment) {
        this._id =
            comment._id ||
            ErrorWrapper.createError({
                name: '_id is not valid',
                cause: invalidFieldErrorInfo({ name: '_id', type: 'string', value: _id }),
                message: 'Error to update comment',
                code: codes.INVALID_TYPES_ERROR
            })
        if (comment.author) this.author = comment.author
        if (comment.details) this.details = comment.details
    }
}
