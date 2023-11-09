import dotenv from 'dotenv'
import express from 'express'
import handlebars from 'express-handlebars'
import articleRouter from './src/routers/articles.routes.js'
import categoryRouter from './src/routers/categories.routes.js'
import commentRouter from './src/routers/comments.routes.js'
import fileRouter from './src/routers/files.routes.js'
import materialRouter from './src/routers/materials.routes.js'
import userRouter from './src/routers/users.routes.js'
import connectMongo from './src/utils/connections.util.js'
import __dirname from './src/utils/dirname.util.js'
import cors from 'cors'

dotenv.config()
const app = express()
const port = process.env.PORT

const allowed = ['http://localhost:3000', 'https://pricut-demo.vercel.app/']

const corsOptions = {
    origin: (origin, callback) => {
        //TODO: sacar !origin del if dado que es solo para testeo desde postman
        if (!origin || allowed.indexOf(origin) !== -1) {
            // Permitir solicitudes sin encabezado "Origin" o desde orígenes permitidos
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
}

console.log(corsOptions)

connectMongo()

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use('/api/files', fileRouter.getRouter())
app.use('/api/users', userRouter.getRouter())
app.use('/api/materials', materialRouter.getRouter())
app.use('/api/articles', articleRouter.getRouter())
app.use('/api/categories', categoryRouter.getRouter())
app.use('/api/comments', commentRouter.getRouter())

app.listen(port, () => {
    console.log('app run in port ' + port)
})
