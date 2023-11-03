import CommentService from '../services/comments.service.js'

class CommentController {
    constructor() {
        this.commentService = new CommentService()
    }

    saveComment = async (req, res) => {
        try {
            const { author, details } = req.body
            if (!author) throw new Error('name is not valid')
            if (!details) throw new Error('description is not valid')

            const result = await this.commentService.saveComment({ author, details })

            return res.status(201).json({
                status: 'success',
                message: 'comment successfully created',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    getCommentById = async (req, res) => {
        try {
            const { cid } = req.params
            if (!cid || !isNaN(cid)) throw new Error('cid is required, or is not valid')

            const result = await this.commentService.getCommentById(cid)

            return res.status(200).json({
                status: 'success',
                message: 'comment successfully found',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    getComments = async (req, res) => {
        try {
            const result = await this.commentService.getComments()

            return res.status(200).json({
                status: 'success',
                message: 'all comment',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    updateComment = async (req, res) => {
        try {
            const { author, details } = req.body
            let newComment = {}

            if (author) newComment.author = author
            if (details) newComment.details = details

            const result = await this.commentService.updateComment(newComment)

            return res.status(200).json({
                status: 'success',
                message: 'comment successfully updated',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    deleteComment = async (req, res) => {
        try {
            const { cid } = req.params
            await this.commentService.deleteComment(cid)

            return res.status(204).json({})
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }
}

const commentController = new CommentController()

export default commentController
