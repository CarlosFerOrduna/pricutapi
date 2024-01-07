export class CreateArticle {
    constructor(article) {
        this.title = article.title || 'Title'
        this.body = article.body || 'Body'
    }
}
