import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../../../middlewares/errors/index.js'
import { articleModel } from '../../models/index.js'

export class ArticleService {
    saveArticle = async ({ article }) => {
        const newArticle = new articleModel(article)
        await newArticle.validate()

        return await newArticle.save()
    }

    searchArticles = async ({ limit = 10, page = 1, query }) => {
        return await articleModel.paginate(query, { limit, page })
    }

    getArticleById = async ({ aid }) => {
        const result = await articleModel.findById(aid)
        if (!result) {
            ErrorWrapper.createError({
                name: 'article not exists',
                cause: invalidFieldErrorInfo({
                    name: 'article',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get article',
                code: codes.NOT_FOUND,
            })
        }

        return result
    }

    updateArticle = async ({ article }) => {
        const result = await articleModel.findByIdAndUpdate(article._id, article, { new: true })
        if (!result) {
            ErrorWrapper.createError({
                name: 'article not exists',
                cause: invalidFieldErrorInfo({
                    name: 'article',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to update article',
                code: codes.NOT_FOUND,
            })
        }

        return result
    }

    deleteArticle = async ({ aid }) => {
        const article = await articleModel.findById(aid)
        if (!article) {
            ErrorWrapper.createError({
                name: 'article not exists',
                cause: invalidFieldErrorInfo({
                    name: 'article',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to delete article',
                code: codes.NOT_FOUND,
            })
        }

        const result = await article.softDelete()

        return result
    }
}
