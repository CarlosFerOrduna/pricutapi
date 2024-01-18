export class CreateComment {
    constructor(comment) {
        this.user = comment.user || null
        this.details = comment.details || null
    }
}
