import { connect, set } from 'mongoose'

import config from '../config/index.js'
import ErrorWrapper from '../middlewares/errors/entities/ErrorWrapper.js'
import codes from '../middlewares/errors/enum/index.js'

export let Articles
export let Categories
export let Cities
export let Comments
export let Files
export let Materials
export let Users

switch (config.persistence) {
    case 'mongo':
        try {
            await connect(config.connectionString)
            set('debug', true)

            const { default: ArticlesMongo } = await import(
                './mongo/models/articles/schema/index.js'
            )
            Articles = ArticlesMongo
            const { default: CategoriesMongo } = await import(
                './mongo/models/categories/schema/index.js'
            )
            Categories = CategoriesMongo
            const { default: CitiesMongo } = await import(
                './mongo/models/cities/schema/index.js'
            )
            Cities = CitiesMongo
            const { default: CommentsMongo } = await import(
                './mongo/models/comments/schema/index.js'
            )
            Comments = CommentsMongo
            const { default: FilesMongo } = await import(
                './mongo/models/files/schema/index.js'
            )
            Files = FilesMongo
            const { default: MaterialsMongo } = await import(
                './mongo/models/materials/schema/index.js'
            )
            Materials = MaterialsMongo
            const { default: UsersMongo } = await import(
                './mongo/models/users/schema/index.js'
            )
            Users = UsersMongo
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
