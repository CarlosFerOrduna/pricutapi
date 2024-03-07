import { Router } from 'express'

import {
    ArticleRouter,
    CategoryRouter,
    CityRouter,
    CommentRouter,
    ContactRouter,
    CutServiceRouter,
    FileRouter,
    MaterialRouter,
    ProductRouter,
    ShipmentRouter,
    ShipmentServiceRouter,
    TemplateEmailRouter,
    UserRouter,
} from './api/index.js'

export const router = Router()

router.use('/api/articles', new ArticleRouter().getRouter())
router.use('/api/categories', new CategoryRouter().getRouter())
router.use('/api/cities', new CityRouter().getRouter())
router.use('/api/comments', new CommentRouter().getRouter())
router.use('/api/contact', new ContactRouter().getRouter())
router.use('/api/files', new FileRouter().getRouter())
router.use('/api/materials', new MaterialRouter().getRouter())
router.use('/api/products', new ProductRouter().getRouter())
router.use('/api/cutservices', new CutServiceRouter().getRouter())
router.use('/api/shipmentservices', new ShipmentServiceRouter().getRouter())
router.use('/api/shipments', new ShipmentRouter().getRouter())
router.use('/api/templates-email', new TemplateEmailRouter().getRouter())
router.use('/api/users', new UserRouter().getRouter())
