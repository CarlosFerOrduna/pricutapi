import cors from 'cors'
import express, { json, urlencoded } from 'express'
import compression from 'express-compression'
import handlebars from 'express-handlebars'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUIExpress from 'swagger-ui-express'

import config from './config/index.js'
import { ErrorWrapper, codes, handlerErrors } from './middlewares/errors/index.js'
import { handlerLogs } from './middlewares/logs/index.js'
import { router } from './routers/index.js'
import __dirname from './utils/dirname.util.js'

const app = express()

const swaggerOptions = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'pricut',
            description: 'Documentation for API pricut',
        },
    },
    apis: ['../docs/**/*.yaml'],
}

const specs = swaggerJSDoc(swaggerOptions)

const corsOptions = {
    origin: (origin, callback) => {
        if (config.allowlist.includes(origin)) callback(null, true)
        else callback(new Error('internal server error'))
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false,
}

app.use(handlerLogs)
app.use(cors(corsOptions))
app.use('/docs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))
app.use(compression({ brotli: { enabled: true, zlib: {} } }))
app.use(json())
app.use(urlencoded({ extended: true }))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use('/', router)
app.use('*', (req, res) => {
    ErrorWrapper.createError({
        name: 'invalid route',
        cause: 'invalid route',
        message: 'invalid route',
        code: codes.ROUTING_ERROR,
    })
})
app.use(handlerErrors)

app.listen(config.port, () => console.log('app run in port ' + config.port))
