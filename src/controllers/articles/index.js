import { ArticleRepository } from '../../repositories/index.js'

export class ArticleController {
    constructor() {
        this.articleRepository = new ArticleRepository()
    }

    saveArticle = async (req, res) => {
        try {
            const { title, body } = req.body
            if (!title) throw new Error('title is not valid')
            if (!body) throw new Error('body is not valid')

            const result = await this.articleRepository.saveArticle({ title, body })

            return res.status(201).send({
                status: 'success',
                message: 'article successfully created',
                data: result
            })
        } catch (error) {
            return res.status(400).send({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    getArticleById = async (req, res) => {
        try {
            const { aid } = req.params
            if (!aid || !isNaN(aid)) throw new Error('aid is required, or is not valid')

            const result = await this.articleRepository.getArticleById(aid)

            return res.status(200).send({
                status: 'success',
                message: 'article successfully found',
                data: result
            })
        } catch (error) {
            return res.status(400).send({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    searchArticles = async (req, res) => {
        try {
            const { limit, page, title, body } = req.query

            let query = {}
            if (title) query.title = title
            if (body) query.body = body

            const result = await this.articleRepository.searchArticles(limit, page, query)

            return res.status(200).send({
                status: 'success',
                message: 'all article',
                data: result
            })
        } catch (error) {
            return res.status(400).send({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    updateArticle = async (req, res) => {
        try {
            const { title, body } = req.body
            let newArticle = {}

            if (title) newArticle.title = title
            if (body) newArticle.body = body

            const result = await this.articleRepository.updateArticle(newArticle)

            return res.status(200).send({
                status: 'success',
                message: 'article successfully updated',
                data: result
            })
        } catch (error) {
            return res.status(400).send({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    deleteArticle = async (req, res) => {
        try {
            const { mid } = req.params
            await this.articleRepository.deleteArticle(mid)

            return res.status(204).send({})
        } catch (error) {
            return res.status(400).send({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }
}
