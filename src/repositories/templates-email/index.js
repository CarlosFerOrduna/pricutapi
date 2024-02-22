import { CreateTemplateEmail, SelectTemplateEmail, UpdateTemplateEmail } from '../../dao/dtos/index.js'
import { templateEmailDAO } from '../../dao/index.js'

export class TemplateEmailRepository {
    constructor() {
        this.dao = templateEmailDAO
    }

    saveTemplateEmail = async ({ templateEmail }) => {
        const createTemplateEmail = new CreateTemplateEmail(templateEmail)
        const templateEmailCreated = await this.dao.saveTemplateEmail({ templateEmail: createTemplateEmail })

        return new SelectTemplateEmail(templateEmailCreated)
    }

    getTemplateEmailById = async ({ teid }) => {
        const templateEmail = await this.dao.getTemplateEmailById({ teid })

        return new SelectTemplateEmail(templateEmail)
    }

    searchTemplateEmails = async ({ query }) => {
        return await this.dao.searchTemplateEmails({ query })
    }

    updateTemplateEmail = async ({ templateEmail }) => {
        const updateTemplateEmail = new UpdateTemplateEmail(templateEmail)
        const templateEmailUpdated = await this.dao.updateTemplateEmail({ templateEmail: updateTemplateEmail })

        return new SelectTemplateEmail(templateEmailUpdated)
    }

    deleteTemplateEmail = async ({ teid }) => {
        return await this.dao.deleteTemplateEmail({ teid })
    }
}
