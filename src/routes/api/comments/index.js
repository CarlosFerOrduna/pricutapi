import { CommentController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class CommentRouter extends BaseRouter {
    init() {
        this.commentController = new CommentController()

        this.get('/', ['public'], this.commentController.searchComments)
        this.get('/:cid', ['public'], this.commentController.getCommentById)
        this.post('/', ['admin'], this.commentController.saveComment)
        this.put('/:cid', ['admin'], this.commentController.updateComment)
        this.delete('/:cid', ['admin'], this.commentController.deleteComment)
    }
}
