import commentController from '../controllers/comments.controller.js'
import BaseRouter from './base.routes.js'

class CommentRouter extends BaseRouter {
    init() {
        this.get('/', ['public'], commentController.getComments)
        this.get('/:fid', ['public'], commentController.getCommentById)
        this.post('/', ['public'], commentController.saveComment)
        this.put('/:fid', ['public'], commentController.updateComment)
        this.delete('/:fid', ['public'], commentController.deleteComment)
    }
}

const commentRouter = new CommentRouter()

export default commentRouter
