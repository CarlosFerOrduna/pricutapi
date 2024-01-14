export class UpdateArticle {
    constructor(article) {
        this._id = article._id
        if (article.title) this.title = article.title
        if (article.summary) this.summary = article.summary
        if (article.body) this.body = article.body
        if (article.urlImageSmall) this.urlImageSmall = article.urlImageSmall
        if (article.urlImageLarge) this.urlImageLarge = article.urlImageLarge
        if (article.link) this.link = article.link
    }
}
