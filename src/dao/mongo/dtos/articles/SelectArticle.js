export class SelectArticle {
    constructor(article) {
        this._id = article._id || null
        this.title = article.title || null
        this.body = article.body || null
    }
}
