import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { CommentRepository } from '../../repositories/index.js'

export class CommentController {
    constructor() {
        this.commentRepository = new CommentRepository()
    }

    saveComment = async (req, res) => {
        const { author, details } = req.body
        if (!author || !isNaN(author)) {
            ErrorWrapper.createError({
                name: 'author is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'author',
                    type: 'string',
                    value: author,
                }),
                message: 'Error to create comment',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
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

        const result = await this.commentRepository.saveComment({ commant: { author, details } })

        return res.status(201).send({
            status: 'success',
            message: 'comment successfully created',
            data: result,
        })
    }

    getCommentById = async (req, res) => {
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
    }

    searchComments = async (req, res) => {
        const { limit, page, author, details } = req.query

        let query = {}
        if (author) query.author = author
        if (details) query.details = details

        const result = await this.commentRepository.searchComments({ limit, page, query })

        return res.status(200).send({
            status: 'success',
            message: 'all comment',
            data: result,
        })
    }

    updateComment = async (req, res) => {
        const { author, details } = req.body
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
        if (author) query.author = author
        if (details) query.details = details

        const result = await this.commentRepository.updateComment({ query })

        return res.status(200).send({
            status: 'success',
            message: 'comment successfully updated',
            data: result,
        })
    }

    deleteComment = async (req, res) => {
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
    }
}
