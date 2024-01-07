export class SelectComment {
    constructor(comment) {
        this._id = comment._id || null
        this.author = comment.author || null
        this.details = comment.details || null
    }
}
