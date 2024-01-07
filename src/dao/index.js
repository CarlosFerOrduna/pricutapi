import { connect, set } from 'mongoose'

import config from '../config/index.js'
import ErrorWrapper from '../middlewares/errors/entities/ErrorWrapper.js'
import codes from '../middlewares/errors/enum/index.js'

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

            const { default: ArticlesMongo } = await import(
                './mongo/models/articles/schema/index.js'
            )
            ArticleDAO = ArticlesMongo
            const { default: CategoriesMongo } = await import(
                './mongo/models/categories/schema/index.js'
            )
            CategoryDAO = CategoriesMongo
            const { default: CitiesMongo } = await import(
                './mongo/models/cities/schema/index.js'
            )
            CityDAO = CitiesMongo
            const { default: CommentsMongo } = await import(
                './mongo/models/comments/schema/index.js'
            )
            CommentDAO = CommentsMongo
            const { default: FilesMongo } = await import(
                './mongo/models/files/schema/index.js'
            )
            FileDAO = FilesMongo
            const { default: MaterialsMongo } = await import(
                './mongo/models/materials/schema/index.js'
            )
            MaterialDAO = MaterialsMongo
            const { default: UsersMongo } = await import(
                './mongo/models/users/schema/index.js'
            )
            UserDAO = UsersMongo
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
