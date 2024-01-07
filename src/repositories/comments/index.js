import { CommentDAO } from '../../dao'
import { CreateComment, SelectComment, UpdateComment } from '../../dao/mongo/dtos'

export class CommentsRepository {
    constructor() {
        this.dao = new CommentDAO()
    }

    saveComment = async (comment) => {
        const createComment = new CreateComment(comment)
        const commentCreated = await this.dao.saveComment(createComment)

        return new SelectComment(commentCreated)
    }

    getCommentById = async (cid) => {
        const comment = await this.dao.getCommentById(cid)

        return new SelectComment(comment)
    }

    searchComments = async (limit, page, query) => {
        const {
            docs,
            totalPages,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        } = await this.dao.searchComments(limit, page, query)

        return {
            comments: docs.map((m) => new SelectComment(m.comment)),
            totalPages,
            page,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        }
    }

    updateComment = async (comment) => {
        const updateComment = new UpdateComment(comment)
        const commentUpdated = await this.dao.updateComment(updateComment)

        return new SelectComment(commentUpdated)
    }

    deleteComment = async (cid) => {
        return await this.dao.deleteComment(cid)
    }
}
