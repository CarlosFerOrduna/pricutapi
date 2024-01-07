import { Router } from 'express'

import {
    ArticleRouter,
    CategoryRouter,
    CitiyRouter,
    CommentRouter,
    FileRouter,
    MaterialRouter,
    UserRouter
} from './api/index.js'

export const router = Router()

router.use('/api/articles', new ArticleRouter().getRouter())
router.use('/api/categories', new CategoryRouter().getRouter())
router.use('/api/cities', new CitiyRouter().getRouter())
router.use('/api/comments', new CommentRouter().getRouter())
router.use('/api/files', new FileRouter().getRouter())
router.use('/api/materials', new MaterialRouter().getRouter())
router.use('/api/users', new UserRouter().getRouter())
