import commentModel from '../models/comments.model.js'

export default class CommentService {
    saveComment = async (comment) => {
        try {
            const newComment = new commentModel(comment)
            await newComment.validate()

            return await newComment.save()
        } catch (error) {
            throw new Error('commentService: ' + error)
        }
    }

    getCommentById = async (cid) => {
        try {
            const result = await commentModel.findById(cid)
            if (!result) throw new Error('comment not exists')

            return result
        } catch (error) {
            throw new Error('getCommentById: ' + error)
        }
    }

    getComments = async () => {
        try {
            return await commentModel.find({})
        } catch (error) {
            throw new Error('getComments: ' + error)
        }
    }

    updateComment = async (comment) => {
        try {
            const result = await commentModel.findByIdAndUpdate(comment._id, comment)
            if (!result) throw new Error('comment not exists')

            return result
        } catch (error) {
            throw new Error('updatecomment: ' + error)
        }
    }

    deleteComment = async (cid) => {
        try {
            const result = await commentModel.findByIdAndDelete(cid)
            if (!result) throw new Error('comment not exists')

            return result
        } catch (error) {
            throw new Error('deletecomment: ' + error)
        }
    }
}
