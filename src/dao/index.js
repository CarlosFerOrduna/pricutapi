import { connect, set } from 'mongoose'
import config from '../config/index.js'
import { ErrorWrapper, codes } from '../middlewares/errors/index.js'

import { migrateSchemaHandler } from '../utils/migrateSchemaHandler.js'
import {
    ArticleService,
    CategoryService,
    CityService,
    CommentService,
    CutServiceService,
    FileService,
    MaterialService,
    ProductService,
    ShipmentService,
    ShipmentServiceService,
    TemplateEmailService,
    UserService,
} from './mongo/services/index.js'

export let articleDAO
export let categoryDAO
export let cityDAO
export let commentDAO
export let fileDAO
export let materialDAO
export let productDAO
export let cutServiceDAO
export let shipmentServicesDAO
export let shipmentsDAO
export let templateEmailDAO
export let userDAO

switch (config.persistence) {
    case 'mongo':
        try {
            const { connectionString } = config.database
            await connect(connectionString)
            set('debug', true)

            articleDAO = new ArticleService()
            categoryDAO = new CategoryService()
            cityDAO = new CityService()
            commentDAO = new CommentService()
            fileDAO = new FileService()
            materialDAO = new MaterialService()
            productDAO = new ProductService()
            cutServiceDAO = new CutServiceService()
            shipmentServiceDAO = new ShipmentServiceService()
            shipmentsDAO = new ShipmentService()
            templateEmailDAO = new TemplateEmailService()
            userDAO = new UserService()

            await migrateSchemaHandler()
        } catch (error) {
            ErrorWrapper.createError({
                name: 'can not connect to the db',
                cause: error,
                message: error.message,
                code: codes.DATABASE_ERROR,
            })
        }

        break
}
