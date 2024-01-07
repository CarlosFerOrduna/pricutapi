import { CommentController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class CommentRouter extends BaseRouter {
    init() {
        this.commentController = new CommentController()

        this.get('/', ['public'], this.commentController.searchComments)
        this.get('/:fid', ['public'], this.commentController.getCommentById)
        this.post('/', ['public'], this.commentController.saveComment)
        this.put('/:fid', ['public'], this.commentController.updateComment)
        this.delete('/:fid', ['public'], this.commentController.deleteComment)
    }
}
