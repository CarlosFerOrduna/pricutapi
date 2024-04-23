import { TemplateEmailController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class TemplateEmailRouter extends BaseRouter {
    init() {
        this.templateEmailController = new TemplateEmailController()

        this.get('/', ['public'], this.templateEmailController.searchTemplateEmails)
        this.get('/:teid', ['public'], this.templateEmailController.getTemplateEmailById)
        this.post('/', ['admin'], this.templateEmailController.saveTemplateEmail)
        this.put('/:teid', ['admin'], this.templateEmailController.updateTemplateEmail)
        this.delete('/:teid', ['admin'], this.templateEmailController.deleteTemplateEmail)
    }
}
