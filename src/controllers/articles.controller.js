import ArticleService from '../services/articles.service.js'

class ArticleController {
    constructor() {
        this.articleService = new ArticleService()
    }

    saveArticle = async (req, res) => {
        try {
            const { title, body } = req.body
            if (!title) throw new Error('title is not valid')
            if (!body) throw new Error('body is not valid')

            const result = await this.articleService.saveArticle({ title, body })

            return res.status(201).json({
                status: 'success',
                message: 'article successfully created',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
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

            const result = await this.articleService.getArticleById(aid)

            return res.status(200).json({
                status: 'success',
                message: 'article successfully found',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    getArticles = async (req, res) => {
        try {
            const result = await this.articleService.getArticles()

            return res.status(200).json({
                status: 'success',
                message: 'all article',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
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

            const result = await this.articleService.updateArticle(newArticle)

            return res.status(200).json({
                status: 'success',
                message: 'article successfully updated',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    deleteArticle = async (req, res) => {
        try {
            const { mid } = req.params
            await this.articleService.deleteArticle(mid)

            return res.status(204).json({})
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }
}

const articleController = new ArticleController()

export default articleController
