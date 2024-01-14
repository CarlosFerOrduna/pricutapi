export class SelectArticle {
    constructor(article) {
        this._id = article._id || null
        this.title = article.title || null
        this.summary = article.summary || null
        this.body = article.body || null
        this.urlImageSmall = article.urlImageSmall || null
        this.urlImageLarge = article.urlImageLarge || null
        this.link = article.link || null
    }
}
