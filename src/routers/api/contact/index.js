import { sendEmail } from '../../../utils/mailer.util.js'
import BaseRouter from '../../entities/base.js'

export class ContactUsRouter extends BaseRouter {
    init() {
        this.post('/', ['public'], (req, res) => {
            const {} = req.body
            sendEmail()
        })
    }
}
