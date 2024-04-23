import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../../../middlewares/errors/index.js'
import { templateEmailModel } from '../../models/index.js'

export class TemplateEmailService {
    saveTemplateEmail = async ({ templateEmail }) => {
        const newTemplateEmail = new templateEmailModel(templateEmail)
        await newTemplateEmail.validate()

        return await newTemplateEmail.save()
    }

    getTemplateEmailById = async ({ teid }) => {
        const result = await templateEmailModel.findById(teid)
        if (!result) {
            ErrorWrapper.createError({
                name: 'templateEmail not exists',
                cause: invalidFieldErrorInfo({
                    name: 'templateEmail',
                    type: 'object',
                    value: result,
                }),
                message: 'Error to get templateEmail',
                code: codes.NOT_FOUND,
            })
        }

        return result
    }

    searchTemplateEmails = async ({ query }) => {
        return await templateEmailModel.find(query)
    }

    updateTemplateEmail = async ({ templateEmail }) => {
        const result = await templateEmailModel.findByIdAndUpdate(templateEmail._id, templateEmail, {
            new: true,
        })
        if (!result) {
            ErrorWrapper.createError({
                name: 'templateEmail not exists',
                cause: invalidFieldErrorInfo({
                    name: 'templateEmail',
                    type: 'object',
                    value: result,
                }),
                message: 'Error to update templateEmail',
                code: codes.NOT_FOUND,
            })
        }

        return result
    }

    deleteTemplateEmail = async ({ teid }) => {
        const templateEmail = await templateEmailModel.findById(teid)
        if (!templateEmail) {
            ErrorWrapper.createError({
                name: 'templateEmail not exists',
                cause: invalidFieldErrorInfo({
                    name: 'templateEmail',
                    type: 'object',
                    value: templateEmail,
                }),
                message: 'Error to delete templateEmail',
                code: codes.NOT_FOUND,
            })
        }

        const result = await templateEmail.softDelete()

        return result
    }
}
