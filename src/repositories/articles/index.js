import { articleDAO } from '../../dao/index.js'
import { CreateArticle, SelectArticle, UpdateArticle } from '../../dao/dtos/index.js'

export class ArticleRepository {
    constructor() {
        this.dao = articleDAO
    }

    saveArticle = async (article) => {
        const createArticle = new CreateArticle(article)
        const articleCreated = await this.dao.saveArticle(createArticle)

        return new SelectArticle(articleCreated)
    }

    getArticleById = async (aid) => {
        const article = await this.dao.getArticleById(aid)

        return new SelectArticle(article)
    }

    searchArticles = async (limit, page, query) => {
        const {
            docs,
            totalPages,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        } = await this.dao.searchArticles(limit, page, query)

        return {
            articles: docs.map((a) => new SelectArticle(a)),
            totalPages,
            page,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        }
    }

    updateArticle = async (article) => {
        const updateArticle = new UpdateArticle(article)
        const articleUpdated = await this.dao.updateArticle(updateArticle)

        return new SelectArticle(articleUpdated)
    }

    deleteArticle = async (aid) => {
        return await this.dao.deleteArticle(aid)
    }
}
