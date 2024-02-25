import { ArticleController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class ArticleRouter extends BaseRouter {
    init() {
        this.articleController = new ArticleController()

        this.get('/', ['public'], this.articleController.searchArticles)
        this.get('/:aid', ['public'], this.articleController.getArticleById)
        this.post('/', ['admin'], this.articleController.saveArticle)
        this.put('/:aid', ['admin'], this.articleController.updateArticle)
        this.delete('/:aid', ['admin'], this.articleController.deleteArticle)
    }
}
