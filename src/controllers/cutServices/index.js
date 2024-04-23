import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { CutServiceRepository } from '../../repositories/index.js'
import { handlerError } from '../../utils/handlerError.util.js'
import { uploadImage } from '../../utils/uploadImage.util.js'

export class CutServiceController {
    constructor() {
        this.cutServiceRepository = new CutServiceRepository()
    }

    saveCutService = async (req, res) => {
        try {
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
                    message: 'Error to save cutService',
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
                    message: 'Error to save cutService',
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
                    message: 'Error to save cutService',
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
                    message: 'Error to save cutService',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }

            const [urlImageSmall, urlImageLarge, urlImageAbout, urlImagecommonUses] = await Promise.all([
                uploadImage({ image: small }),
                uploadImage({ image: large }),
                uploadImage({ image: aboutImage }),
                uploadImage({ image: commonUsesImage }),
            ])

            const result = await this.cutServiceRepository.saveCutService({
                cutService: {
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
                message: 'cutService successfully created',
                data: result,
            })
        } catch (error) {
            handlerError(error, res)
        }
    }

    getCutServiceById = async (req, res) => {
        try {
            const { csid } = req.params
            if (!csid) {
                ErrorWrapper.createError({
                    name: 'csid is required, or is not valid',
                    cause: invalidFieldErrorInfo({ name: 'csid', type: 'string', value: csid }),
                    message: 'Error to get cutService',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }

            const result = await this.cutServiceRepository.getCutServiceById({ csid })

            return res.status(200).send({
                status: 'success',
                message: 'cutService successfully found',
                data: result,
            })
        } catch (error) {
            handlerError(error, res)
        }
    }

    searchCutServices = async (req, res) => {
        try {
            const { name, description, cuttingCapacity, supportedThickness, about, commonUses } = req.query

            let query = {}
            if (name) query.name = name
            if (description) query.description = description
            if (cuttingCapacity) query.cuttingCapacity = cuttingCapacity
            if (supportedThickness) query.supportedThickness = supportedThickness
            if (about) query.about = about
            if (commonUses) query.commonUses = commonUses

            const result = await this.cutServiceRepository.searchCutServices({ query })

            return res.status(200).send({
                status: 'success',
                message: 'all cutService',
                data: result,
            })
        } catch (error) {
            handlerError(error, res)
        }
    }

    updateCutService = async (req, res) => {
        try {
            const { files } = req
            const { name, description, cuttingCapacity, supportedThickness, about, commonUses } = req.query
            const { csid } = req.params
            if (!csid || !isNaN(csid)) {
                ErrorWrapper.createError({
                    name: 'csid is required, or is not valid',
                    cause: invalidFieldErrorInfo({ name: 'csid', type: 'string', value: csid }),
                    message: 'Error to update cutService',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }

            let query = { _id: csid }
            if (name) query.name = name
            if (description) query.description = description
            if (cuttingCapacity) query.cuttingCapacity = cuttingCapacity
            if (supportedThickness) query.supportedThickness = supportedThickness
            if (about) query.about = about
            if (files?.aboutImage) {
                const [aboutImage] = files.aboutImage
                query.aboutImage = await uploadImage({ image: aboutImage })
            }
            if (commonUses) query.commonUses = commonUses
            if (files?.commonUsesImage) {
                const [commonUsesImage] = files.commonUsesImage
                query.commonUsesImage = await uploadImage({ image: commonUsesImage })
            }
            if (files?.small) {
                const [small] = files.small
                query.urlImageSmall = await uploadImage({ image: small })
            }
            if (files?.large) {
                const [large] = files.large
                query.urlImageLarge = await uploadImage({ image: large })
            }

            const result = await this.cutServiceRepository.updateCutService({ cutService: query })

            return res.status(200).send({
                status: 'success',
                message: 'cutService successfully updated',
                data: result,
            })
        } catch (error) {
            handlerError(error, res)
        }
    }

    deleteCutService = async (req, res) => {
        try {
            const { csid } = req.params
            if (!csid) {
                ErrorWrapper.createError({
                    name: 'csid is not valid',
                    cause: invalidFieldErrorInfo({
                        name: 'csid',
                        type: 'string',
                        value: csid,
                    }),
                    message: 'Error to delete cutService',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }

            await this.cutServiceRepository.deleteCutService({ csid })

            return res.status(204).send()
        } catch (error) {
            handlerError(error, res)
        }
    }
}
