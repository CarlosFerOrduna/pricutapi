export class SelectComment {
    constructor(comment) {
        this._id = comment._id || null
        this.user = comment.user || null
        this.details = comment.details || null
    }
}
