import userController from '../controllers/users.controller.js'
import BaseRouter from './base.routes.js'

class UserRouter extends BaseRouter {
    init() {
        this.get('/', ['public'], userController.getUsers)
        this.get('/:pid', ['public'], userController.getUserById)
        this.post('/register/', ['public'], userController.createUser)
        this.post('/login/', ['public'], userController.login)
        this.put('/:pid', ['public'], userController.updateUser)
        this.delete('/:pid', ['public'], userController.deleteUser)
    }
}

const userRouter = new UserRouter()

export default userRouter
