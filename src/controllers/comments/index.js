import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { CommentRepository } from '../../repositories/index.js'
import { handlerError } from '../../utils/handlerError.util.js'

export class CommentController {
    constructor() {
        this.commentRepository = new CommentRepository()
    }

    saveComment = async (req, res) => {
        try {
            const { user, details } = req.body
            if (!details || !isNaN(details)) {
                ErrorWrapper.createError({
                    name: 'details is not valid',
                    cause: invalidFieldErrorInfo({
                        name: 'details',
                        type: 'string',
                        value: details,
                    }),
                    message: 'Error to create comment',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }

            const result = await this.commentRepository.saveComment({ comment: { user, details } })

            return res.status(201).send({
                status: 'success',
                message: 'comment successfully created',
                data: result,
            })
        } catch (error) {
            handlerError(error, res)
        }
    }

    getCommentById = async (req, res) => {
        try {
            const { cid } = req.params
            if (!cid || !isNaN(cid)) {
                ErrorWrapper.createError({
                    name: 'cid is not valid',
                    cause: invalidFieldErrorInfo({
                        name: 'cid',
                        type: 'string',
                        value: cid,
                    }),
                    message: 'Error to get comment',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }

            const result = await this.commentRepository.getCommentById({ cid })

            return res.status(200).send({
                status: 'success',
                message: 'comment successfully found',
                data: result,
            })
        } catch (error) {
            handlerError(error, res)
        }
    }

    searchComments = async (req, res) => {
        try {
            const { limit, page, user, details } = req.query

            let query = {}
            if (user) query.user = user
            if (details) query.details = details

            const result = await this.commentRepository.searchComments({ limit, page, query })

            return res.status(200).send({
                status: 'success',
                message: 'all comment',
                data: result,
            })
        } catch (error) {
            handlerError(error, res)
        }
    }

    updateComment = async (req, res) => {
        try {
            const { user, details } = req.body
            const { cid } = req.params
            if (!cid || !isNaN(cid)) {
                ErrorWrapper.createError({
                    name: 'cid is not valid',
                    cause: invalidFieldErrorInfo({
                        name: 'cid',
                        type: 'string',
                        value: cid,
                    }),
                    message: 'Error to update comment',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }

            let query = { _id: cid }
            if (user) query.user = user
            if (details) query.details = details

            const result = await this.commentRepository.updateComment({ comment: query })

            return res.status(200).send({
                status: 'success',
                message: 'comment successfully updated',
                data: result,
            })
        } catch (error) {
            handlerError(error, res)
        }
    }

    deleteComment = async (req, res) => {
        try {
            const { cid } = req.params
            if (!cid || !isNaN(cid)) {
                ErrorWrapper.createError({
                    name: 'cid is not valid',
                    cause: invalidFieldErrorInfo({
                        name: 'cid',
                        type: 'string',
                        value: cid,
                    }),
                    message: 'Error to delete comment',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }

            await this.commentRepository.deleteComment({ cid })

            return res.status(204).send()
        } catch (error) {
            handlerError(error, res)
        }
    }
}
