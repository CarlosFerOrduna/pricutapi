import { UserController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class UserRouter extends BaseRouter {
    init() {
        this.userController = new UserController()

        this.get('/', ['public'], this.userController.searchUsers)
        this.get('/:pid', ['public'], this.userController.getUserById)
        this.post('/register/', ['public'], this.userController.createUser)
        this.post('/login/', ['public'], this.userController.login)
        this.put('/:pid', ['public'], this.userController.updateUser)
        this.delete('/:pid', ['public'], this.userController.deleteUser)
    }
}
