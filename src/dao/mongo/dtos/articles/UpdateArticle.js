import {
    ErrorWrapper,
    codes,
    invalidFieldErrorInfo
} from '../../../../middlewares/errors/index.js'

export class UpdateArticle {
    constructor(article) {
        this._id =
            article._id ||
            ErrorWrapper.createError({
                name: '_id is not valid',
                cause: invalidFieldErrorInfo({ name: '_id', type: 'string', value: _id }),
                message: 'Error to update article',
                code: codes.INVALID_TYPES_ERROR
            })
        if (article.title) this.title = article.title
        if (article.body) this.body = article.body
    }
}
