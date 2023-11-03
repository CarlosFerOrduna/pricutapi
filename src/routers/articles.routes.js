import articleController from '../controllers/articles.controller.js'
import BaseRouter from './base.routes.js'

class ArticleRouter extends BaseRouter {
    init() {
        this.get('/', ['public'], articleController.getArticles)
        this.get('/:fid', ['public'], articleController.getArticleById)
        this.post('/', ['public'], articleController.saveArticle)
        this.put('/:fid', ['public'], articleController.updateArticle)
        this.delete('/:fid', ['public'], articleController.deleteArticle)
    }
}

const articleRouter = new ArticleRouter()

export default articleRouter
