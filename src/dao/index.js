import { connect, set } from 'mongoose'

import config from '../config/index.js'
import { ErrorWrapper, codes } from '../middlewares/errors/index.js'

export let articleDAO
export let categoryDAO
export let cityDAO
export let commentDAO
export let fileDAO
export let materialDAO
export let userDAO

switch (config.persistence) {
    case 'mongo':
        try {
            await connect(config.connectionString)
            set('debug', true)

            const { ArticleService } = await import('./mongo/services/articles/index.js')
            articleDAO = new ArticleService()
            const { CategoryService } = await import('./mongo/services/categories/index.js')
            categoryDAO = new CategoryService()
            const { CityService } = await import('./mongo/services/cities/index.js')
            cityDAO = new CityService()
            const { CommentService } = await import('./mongo/services/comments/index.js')
            commentDAO = new CommentService()
            const { FileService } = await import('./mongo/services/files/index.js')
            fileDAO = new FileService()
            const { MaterialService } = await import('./mongo/services/materials/index.js')
            materialDAO = new MaterialService()
            const { UserService } = await import('./mongo/services/users/index.js')
            userDAO = new UserService()
        } catch (error) {
            ErrorWrapper.createError({
                name: 'can not connect to the db',
                cause: error,
                message: error.message,
                code: codes.DATABASE_ERROR
            })
        }
        break
}
