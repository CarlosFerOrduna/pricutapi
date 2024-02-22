import { TemplateEmailController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class TemplateEmailRouter extends BaseRouter {
    init() {
        this.templateEmailController = new TemplateEmailController()

        this.get('/', ['public'], this.templateEmailController.searchTemplateEmails)
        this.get('/:cid', ['public'], this.templateEmailController.getTemplateEmailById)
        this.post('/', ['public'], this.templateEmailController.saveTemplateEmail)
        this.put('/:cid', ['public'], this.templateEmailController.updateTemplateEmail)
        this.delete('/:cid', ['public'], this.templateEmailController.deleteTemplateEmail)
    }
}
