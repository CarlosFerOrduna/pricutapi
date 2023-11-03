import articleModel from '../models/articles.model.js'

export default class ArticleService {
    saveArticle = async (article) => {
        try {
            const newArticle = new articleModel(article)
            await newArticle.validate()

            return await newArticle.save()
        } catch (error) {
            throw new Error('articleService: ' + error)
        }
    }

    getArticleById = async (aid) => {
        try {
            const result = await articleModel.findById(aid)
            if (!result) throw new Error('article not exists')

            return result
        } catch (error) {
            throw new Error('getArticleById: ' + error)
        }
    }

    getArticles = async () => {
        try {
            return await articleModel.find({})
        } catch (error) {
            throw new Error('getArticles: ' + error)
        }
    }

    updateArticle = async (article) => {
        try {
            const result = await articleModel.findByIdAndUpdate(article._id, article)
            if (!result) throw new Error('article not exists')

            return result
        } catch (error) {
            throw new Error('updatearticle: ' + error)
        }
    }

    deleteArticle = async (aid) => {
        try {
            const result = await articleModel.findByIdAndDelete(aid)
            if (!result) throw new Error('article not exists')

            return result
        } catch (error) {
            throw new Error('deletearticle: ' + error)
        }
    }
}
