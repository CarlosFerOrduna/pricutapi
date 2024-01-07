import { ArticleDAO } from '../../dao/index.js'
import { CreateArticle, SelectArticle, UpdateArticle } from '../../dao/mongo/dtos'

export class ArticleRepository {
    constructor() {
        this.dao = new ArticleDAO()
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
            articles: docs.map((m) => new SelectArticle(m.article)),
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
