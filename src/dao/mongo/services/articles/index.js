import {
    ErrorWrapper,
    codes,
    invalidFieldErrorInfo
} from '../../../../middlewares/errors/index.js'
import { articleModel } from '../../models/index.js'

export class ArticleService {
    saveArticle = async (article) => {
        const newArticle = new articleModel(article)
        await newArticle.validate()

        return await newArticle.save()
    }

    searchArticles = async (limit, page, query) => {
        return await articleModel.paginate(query, { limit: limit ?? 3, page: page ?? 1 })
    }

    getArticleById = async (aid) => {
        const result = await articleModel.findById(aid)
        if (!result) {
            ErrorWrapper.createError({
                name: 'article not exists',
                cause: invalidFieldErrorInfo({
                    name: 'article',
                    type: 'string',
                    value: result
                }),
                message: 'Error to get article',
                code: codes.NOT_FOUND
            })
        }

        return result
    }

    updateArticle = async (article) => {
        const result = await articleModel.findByIdAndUpdate(article._id, article)
        if (!result) {
            ErrorWrapper.createError({
                name: 'article not exists',
                cause: invalidFieldErrorInfo({
                    name: 'article',
                    type: 'string',
                    value: result
                }),
                message: 'Error to update article',
                code: codes.NOT_FOUND
            })
        }

        return result
    }

    deleteArticle = async (aid) => {
        const result = await articleModel.findByIdAndDelete(aid)
        if (!result) {
            ErrorWrapper.createError({
                name: 'article not exists',
                cause: invalidFieldErrorInfo({
                    name: 'article',
                    type: 'string',
                    value: result
                }),
                message: 'Error to delete article',
                code: codes.NOT_FOUND
            })
        }

        return result
    }
}
