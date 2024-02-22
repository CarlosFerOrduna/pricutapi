import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { TemplateEmailRepository } from '../../repositories/index.js'

export class TemplateEmailController {
    constructor() {
        this.templateEmailRepository = new TemplateEmailRepository()
    }

    saveTemplateEmail = async (req, res) => {
        const { name, from, subject, text, html, attachments, alternatives, status } = req.body
        if (!name || !isNaN(name)) {
            ErrorWrapper.createError({
                name: 'details is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'details',
                    type: 'string',
                    value: details,
                }),
                message: 'Error to create templateEmail',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.templateEmailRepository.saveTemplateEmail({
            templateEmail: { name, from, subject, text, html, attachments, alternatives, status },
        })

        return res.status(201).send({
            status: 'success',
            message: 'templateEmail successfully created',
            data: result,
        })
    }

    getTemplateEmailById = async (req, res) => {
        const { teid } = req.params
        if (!teid || !isNaN(teid)) {
            ErrorWrapper.createError({
                name: 'teid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'teid',
                    type: 'string',
                    value: teid,
                }),
                message: 'Error to get templateEmail',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.templateEmailRepository.getTemplateEmailById({ teid })

        return res.status(200).send({
            status: 'success',
            message: 'templateEmail successfully found',
            data: result,
        })
    }

    searchTemplateEmails = async (req, res) => {
        const { name, from, subject, text, html, attachments, alternatives, status } = req.query

        let query = {}
        if (name) query.name = name
        if (from) query.from = from
        if (subject) query.subject = subject
        if (text) query.text = text
        if (html) query.html = html
        if (attachments) query.attachments = attachments
        if (alternatives) query.alternatives = alternatives
        if (status) query.status = status

        const result = await this.templateEmailRepository.searchTemplateEmails({ query })

        return res.status(200).send({
            status: 'success',
            message: 'all templateEmail',
            data: result,
        })
    }

    updateTemplateEmail = async (req, res) => {
        const { name, from, subject, text, html, attachments, alternatives, status } = req.body
        const { teid } = req.params
        if (!teid || !isNaN(teid)) {
            ErrorWrapper.createError({
                name: 'teid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'teid',
                    type: 'string',
                    value: teid,
                }),
                message: 'Error to update templateEmail',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        let query = { _id: teid }
        if (name) query.name = name
        if (from) query.from = from
        if (subject) query.subject = subject
        if (text) query.text = text
        if (html) query.html = html
        if (attachments) query.attachments = attachments
        if (alternatives) query.alternatives = alternatives
        if (status) query.status = status

        const result = await this.templateEmailRepository.updateTemplateEmail({ templateEmail: query })

        return res.status(200).send({
            status: 'success',
            message: 'templateEmail successfully updated',
            data: result,
        })
    }

    deleteTemplateEmail = async (req, res) => {
        const { teid } = req.params
        if (!teid || !isNaN(teid)) {
            ErrorWrapper.createError({
                name: 'teid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'teid',
                    type: 'string',
                    value: teid,
                }),
                message: 'Error to delete templateEmail',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        await this.templateEmailRepository.deleteTemplateEmail({ teid })

        return res.status(204).send()
    }
}
