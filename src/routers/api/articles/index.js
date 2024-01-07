import { ArticleController } from '../../../controllers/index.js'
import BaseRouter from '../../entity/base.js'

export class ArticleRouter extends BaseRouter {
    init() {
        this.articleController = new ArticleController()

        this.get('/', ['public'], this.articleController.searchArticles)
        this.get('/:fid', ['public'], this.articleController.getArticleById)
        this.post('/', ['public'], this.articleController.saveArticle)
        this.put('/:fid', ['public'], this.articleController.updateArticle)
        this.delete('/:fid', ['public'], this.articleController.deleteArticle)
    }
}
