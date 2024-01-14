import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { ArticleRepository } from '../../repositories/index.js'

export class ArticleController {
    constructor() {
        this.articleRepository = new ArticleRepository()
    }

    saveArticle = async (req, res) => {
        const { title, summary, body, urlImageSmall, urlImageLarge, link } = req.body
        if (!title) {
            ErrorWrapper.createError({
                name: 'title is not valid',
                cause: invalidFieldErrorInfo({ name: 'title', type: 'string', value: title }),
                message: 'Error to save article',
                code: codes.INVALID_TYPES_ERROR
            })
        }
        if (!body) {
            ErrorWrapper.createError({
                name: 'body is not valid',
                cause: invalidFieldErrorInfo({ name: 'body', type: 'string', value: body }),
                message: 'Error to save article',
                code: codes.INVALID_TYPES_ERROR
            })
        }
        if (!summary) {
            ErrorWrapper.createError({
                name: 'body is not valid',
                cause: invalidFieldErrorInfo({ name: 'body', type: 'string', value: body }),
                message: 'Error to save article',
                code: codes.INVALID_TYPES_ERROR
            })
        }

        const result = await this.articleRepository.saveArticle({
            title,
            summary,
            body,
            urlImageSmall,
            urlImageLarge,
            link
        })

        return res.status(201).send({
            status: 'success',
            message: 'article successfully created',
            data: result
        })
    }

    getArticleById = async (req, res) => {
        const { aid } = req.params
        if (!aid || !isNaN(aid)) {
            ErrorWrapper.createError({
                name: 'aid is required, or is not valid',
                cause: invalidFieldErrorInfo({ name: 'aid', type: 'string', value: aid }),
                message: 'Error to get article',
                code: codes.INVALID_TYPES_ERROR
            })
        }

        const result = await this.articleRepository.getArticleById(aid)

        return res.status(200).send({
            status: 'success',
            message: 'article successfully found',
            data: result
        })
    }

    searchArticles = async (req, res) => {
        const { limit, page, title, summary, body, urlImageSmall, urlImageLarge, link } =
            req.query

        let query = {}
        if (title) query.title = title
        if (summary) query.summary = summary
        if (body) query.body = body
        if (urlImageSmall) query.urlImageSmall = urlImageSmall
        if (urlImageLarge) query.urlImageLarge = urlImageLarge
        if (link) query.link = link

        const result = await this.articleRepository.searchArticles(limit, page, query)

        return res.status(200).send({
            status: 'success',
            message: 'all article',
            data: result
        })
    }

    updateArticle = async (req, res) => {
        const { title, summary, body, urlImageSmall, urlImageLarge, link } = req.body
        const { aid } = req.query
        if (!aid || !isNaN(aid)) {
            ErrorWrapper.createError({
                name: 'aid is required, or is not valid',
                cause: invalidFieldErrorInfo({ name: 'aid', type: 'string', value: aid }),
                message: 'Error to update article',
                code: codes.INVALID_TYPES_ERROR
            })
        }

        let query = { _id: aid }
        if (title) query.title = title
        if (summary) query.summary = summary
        if (body) query.body = body
        if (urlImageSmall) query.urlImageSmall = urlImageSmall
        if (urlImageLarge) query.urlImageLarge = urlImageLarge
        if (link) query.link = link

        const result = await this.articleRepository.updateArticle(query)

        return res.status(200).send({
            status: 'success',
            message: 'article successfully updated',
            data: result
        })
    }

    deleteArticle = async (req, res) => {
        const { aid } = req.params
        if (!aid) {
            ErrorWrapper.createError({
                name: 'aid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'aid',
                    type: 'string',
                    value: aid
                }),
                message: 'Error to delete category',
                code: codes.INVALID_TYPES_ERROR
            })
        }

        await this.articleRepository.deleteArticle(aid)

        return res.status(204).send()
    }
}
