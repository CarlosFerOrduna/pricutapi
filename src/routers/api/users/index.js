import { UserController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class UserRouter extends BaseRouter {
    init() {
        this.userController = new UserController()

        this.get('/', ['public'], this.userController.searchUsers)
        this.get('/:uid', ['public'], this.userController.getUserById)
        this.post('/', ['public'], this.userController.saveUser)
        this.post('/login', ['public'], this.userController.login)
        this.put('/:uid', ['public'], this.userController.updateUser)
        this.delete('/:uid', ['public'], this.userController.deleteUser)
    }
}
