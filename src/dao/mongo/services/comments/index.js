import {
    ErrorWrapper,
    codes,
    invalidFieldErrorInfo,
} from '../../../../middlewares/errors/index.js'
import { commentModel } from '../../models/index.js'

export class CommentService {
    saveComment = async ({ comment }) => {
        const newComment = new commentModel(comment)
        await newComment.validate()

        return await newComment.save()
    }

    getCommentById = async ({ cid }) => {
        const result = await commentModel.findById(cid).populate('user')
        if (!result) {
            ErrorWrapper.createError({
                name: 'comment not exists',
                cause: invalidFieldErrorInfo({
                    name: 'comment',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get comment',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    searchComments = async ({ limit = 10, page = 1, query }) => {
        const result = await commentModel.paginate(query, { limit, page, populate: 'author' })
        if (!result) {
            ErrorWrapper.createError({
                name: 'comment not exists',
                cause: invalidFieldErrorInfo({
                    name: 'comment',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get comment',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    updateComments = async ({ comment }) => {
        const result = await commentModel.findByIdAndUpdate(comment._id, comment, {
            new: true,
        })
        if (!result) {
            ErrorWrapper.createError({
                name: 'comment not exists',
                cause: invalidFieldErrorInfo({
                    name: 'comment',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to update comment',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    deleteComment = async ({ cid }) => {
        const comment = await commentModel.findById(cid)
        if (!comment) {
            ErrorWrapper.createError({
                name: 'comment not exists',
                cause: invalidFieldErrorInfo({
                    name: 'comment',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to delete comment',
                code: codes.DATABASE_ERROR,
            })
        }

        const result = await comment.softDelete()

        return result
    }
}
