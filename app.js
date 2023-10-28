import dotenv from 'dotenv'
import express from 'express'
import handlebars from 'express-handlebars'
import fileRouter from './src/routers/files.routes.js'
import materialRouter from './src/routers/materials.routes.js'
import userRouter from './src/routers/users.routes.js'
import connectMongo from './src/utils/connections.util.js'
import __dirname from './src/utils/dirname.util.js'

dotenv.config()
const app = express()
const port = process.env.PORT

connectMongo()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/api/files', fileRouter.getRouter())
app.use('/api/users', userRouter.getRouter())
app.use('/api/materials', materialRouter.getRouter())

app.listen(port, () => {
    console.log('app run in port ' + port)
})
