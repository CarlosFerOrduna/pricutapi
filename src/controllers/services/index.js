import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { ServiceRepository } from '../../repositories/index.js'

export class ServiceController {
    constructor() {
        this.serviceRepository = new ServiceRepository()
    }

    saveService = async (req, res) => {
        const {
            files: {
                small: [small],
                large: [large],
                aboutImage: [aboutImage],
                commonUsesImage: [commonUsesImage],
            },
        } = req
        const { name, description, cuttingCapacity, supportedThickness, about, commonUses } = req.body
        if (!name) {
            ErrorWrapper.createError({
                name: 'name is not valid',
                cause: invalidFieldErrorInfo({ name: 'name', type: 'string', value: name }),
                message: 'Error to save service',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!description) {
            ErrorWrapper.createError({
                name: 'description is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'description',
                    type: 'string',
                    value: description,
                }),
                message: 'Error to save service',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!cuttingCapacity) {
            ErrorWrapper.createError({
                name: 'cuttingCapacity is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'cuttingCapacity',
                    type: 'string',
                    value: cuttingCapacity,
                }),
                message: 'Error to save service',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!supportedThickness) {
            ErrorWrapper.createError({
                name: 'supportedThickness is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'supportedThickness',
                    type: 'string',
                    value: supportedThickness,
                }),
                message: 'Error to save service',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const urlImageSmall = await uploadImage({ image: small })
        const urlImageLarge = await uploadImage({ image: large })
        const urlImageAbout = await uploadImage({ image: aboutImage })
        const urlImagecommonUses = await uploadImage({ image: commonUsesImage })

        const result = await this.serviceRepository.saveService({
            service: {
                name,
                description,
                cuttingCapacity,
                supportedThickness,
                about,
                aboutImage: urlImageAbout,
                commonUses,
                commonUsesImage: urlImagecommonUses,
                urlImageSmall,
                urlImageLarge,
            },
        })

        return res.status(201).send({
            status: 'success',
            message: 'service successfully created',
            data: result,
        })
    }

    getServiceById = async (req, res) => {
        const { sid } = req.params
        if (!sid || !isNaN(sid)) {
            ErrorWrapper.createError({
                name: 'sid is required, or is not valid',
                cause: invalidFieldErrorInfo({ name: 'sid', type: 'string', value: sid }),
                message: 'Error to get service',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.serviceRepository.getServiceById({ sid })

        return res.status(200).send({
            status: 'success',
            message: 'service successfully found',
            data: result,
        })
    }

    searchServices = async (req, res) => {
        const { limit, page, name, description, cuttingCapacity, supportedThickness, about, commonUses } = req.query

        let query = {}
        if (name) query.name = name
        if (description) query.description = description
        if (cuttingCapacity) query.cuttingCapacity = cuttingCapacity
        if (supportedThickness) query.supportedThickness = supportedThickness
        if (about) query.about = about
        if (commonUses) query.commonUses = commonUses

        const result = await this.serviceRepository.searchServices({ limit, page, query })

        return res.status(200).send({
            status: 'success',
            message: 'all service',
            data: result,
        })
    }

    updateService = async (req, res) => {
        const {
            files: {
                small: [small],
                large: [large],
                aboutImage: [aboutImage],
                commonUsesImage: [commonUsesImage],
            },
        } = req
        const { name, description, cuttingCapacity, supportedThickness, about, commonUses } = req.query
        const { sid } = req.params
        if (!sid || !isNaN(sid)) {
            ErrorWrapper.createError({
                name: 'sid is required, or is not valid',
                cause: invalidFieldErrorInfo({ name: 'sid', type: 'string', value: sid }),
                message: 'Error to update service',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        let query = { _id: sid }
        if (name) query.name = name
        if (description) query.description = description
        if (cuttingCapacity) query.cuttingCapacity = cuttingCapacity
        if (supportedThickness) query.supportedThickness = supportedThickness
        if (about) query.about = about
        if (aboutImage) query.aboutImage = await uploadImage({ image: aboutImage })
        if (commonUses) query.commonUses = commonUses
        if (commonUsesImage) query.commonUsesImage = await uploadImage({ image: commonUsesImage })
        if (small) query.urlImageSmall = await uploadImage({ image: small })
        if (large) query.urlImageLarge = await uploadImage({ image: large })

        const result = await this.serviceRepository.updateService({ query })

        return res.status(200).send({
            status: 'success',
            message: 'service successfully updated',
            data: result,
        })
    }

    deleteService = async (req, res) => {
        const { sid } = req.params
        if (!sid) {
            ErrorWrapper.createError({
                name: 'sid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'sid',
                    type: 'string',
                    value: sid,
                }),
                message: 'Error to delete service',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        await this.serviceRepository.deleteService({ sid })

        return res.status(204).send()
    }
}
