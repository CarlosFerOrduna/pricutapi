import { ContactController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class ContactRouter extends BaseRouter {
    init() {
        this.contactRouter = new ContactController()

        this.post('/', ['public'], this.contactRouter.contactUs)
    }
}
