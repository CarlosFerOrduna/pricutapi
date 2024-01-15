import { ArticleController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class ArticleRouter extends BaseRouter {
    init() {
        this.articleController = new ArticleController()

        this.get('/', ['public'], this.articleController.searchArticles)
        this.get('/:aid', ['public'], this.articleController.getArticleById)
        this.post('/', ['public'], this.articleController.saveArticle)
        this.put('/:aid', ['public'], this.articleController.updateArticle)
        this.delete('/:aid', ['public'], this.articleController.deleteArticle)
    }
}
