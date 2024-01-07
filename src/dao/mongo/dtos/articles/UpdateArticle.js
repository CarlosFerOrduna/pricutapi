import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../../../middlewares/errors'

export class UpdateArticle {
    constructor(article) {
        this._id =
            article._id ||
            ErrorWrapper.createError({
                name: 'aid is not valid',
                cause: invalidFieldErrorInfo({ name: 'pid', type: 'string', value: pid }),
                message: 'Error to update product',
                code: codes.INVALID_TYPES_ERROR
            })
        if (article.title) this.title = article.title
        if (article.body) this.body = article.body
    }
}
