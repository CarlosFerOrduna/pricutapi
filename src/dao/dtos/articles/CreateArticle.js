export class CreateArticle {
    constructor(article) {
        this.title = article.title || null
        this.body = article.body || null
    }
}
