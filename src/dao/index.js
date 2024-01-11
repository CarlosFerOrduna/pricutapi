import { connect, set } from 'mongoose'

import config from '../config/index.js'
import { ErrorWrapper, codes } from '../middlewares/errors/index.js'

export let ArticleDAO
export let CategoryDAO
export let CityDAO
export let CommentDAO
export let FileDAO
export let MaterialDAO
export let UserDAO

switch (config.persistence) {
    case 'mongo':
        try {
            await connect(config.connectionString)
            set('debug', true)

            const { ArticleService } = await import('./mongo/services/articles/index.js')
            ArticleDAO = ArticleService
            const { CategoryService } = await import('./mongo/services/categories/index.js')
            CategoryDAO = CategoryService
            const { CityService } = await import('./mongo/services/cities/index.js')
            CityDAO = CityService
            const { CommentService } = await import('./mongo/services/comments/index.js')
            CommentDAO = CommentService
            const { FileService } = await import('./mongo/services/files/index.js')
            FileDAO = FileService
            const { MaterialService } = await import('./mongo/services/materials/index.js')
            MaterialDAO = MaterialService
            const { UserService } = await import('./mongo/services/users/index.js')
            UserDAO = UserService
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
