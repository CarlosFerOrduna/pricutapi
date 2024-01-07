export class CreateComment {
    constructor(comment) {
        this.author = comment.author || null
        this.details = comment.details || null
    }
}
