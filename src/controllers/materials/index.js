import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { MaterialRepository } from '../../repositories/index.js'
import { uploadImage } from '../../utils/uploadImage.util.js'
import { handlerError } from '../../utils/handlerError.util.js'

export class MaterialController {
    constructor() {
        this.materialRepository = new MaterialRepository()
    }

    saveMaterial = async (req, res) => {
        try {
            const {
                files: {
                    small: [small],
                    large: [large],
                    aboutImage: [aboutImage],
                    commonUsesImage: [commonUsesImage],
                },
            } = req
            const { name, description, about, category, commonUses } = req.body
            if (!name) {
                ErrorWrapper.createError({
                    name: 'name is not valid',
                    cause: invalidFieldErrorInfo({
                        name: 'name',
                        type: 'string',
                        value: name,
                    }),
                    message: 'Error to save material',
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
                    message: 'Error to save material',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }
            if (!category) {
                ErrorWrapper.createError({
                    name: 'category is not valid',
                    cause: invalidFieldErrorInfo({
                        name: 'category',
                        type: 'string',
                        value: category,
                    }),
                    message: 'Error to save material',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }

            const urlImageSmall = await uploadImage({ image: small })
            const urlImageLarge = await uploadImage({ image: large })
            const urlImageAbout = await uploadImage({ image: aboutImage })
            const urlImagecommonUses = await uploadImage({ image: commonUsesImage })

            const result = await this.materialRepository.saveMaterial({
                material: {
                    name,
                    description,
                    about,
                    aboutImage: urlImageAbout,
                    category,
                    commonUses,
                    commonUsesImage: urlImagecommonUses,
                    urlImageSmall,
                    urlImageLarge,
                },
            })

            return res.status(201).send({
                status: 'success',
                message: 'material successfully created',
                data: result,
            })
        } catch (error) {
            handlerError(error, res)
        }
    }

    getMaterialById = async (req, res) => {
        try {
            const { mid } = req.params
            if (!mid || !isNaN(mid)) {
                ErrorWrapper.createError({
                    name: 'mid is not valid',
                    cause: invalidFieldErrorInfo({
                        name: 'mid',
                        type: 'string',
                        value: mid,
                    }),
                    message: 'Error to get material',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }

            const result = await this.materialRepository.getMaterialById({ mid })

            return res.status(200).send({
                status: 'success',
                message: 'material successfully found',
                data: result,
            })
        } catch (error) {
            handlerError(error, res)
        }
    }

    searchMaterials = async (req, res) => {
        try {
            const { limit, page, name, description, about, category, commonUses } = req.query

            let query = {}
            if (name) query.name = name
            if (description) query.description = description
            if (about) query.about = about
            if (category) query.category = category
            if (commonUses) query.commonUses = commonUses

            const result = await this.materialRepository.searchMaterials({ limit, page, query })

            return res.status(200).send({
                status: 'success',
                message: 'all material',
                data: result,
            })
        } catch (error) {
            handlerError(error, res)
        }
    }

    updateMaterial = async (req, res) => {
        try {
            const { files } = req
            const { name, description, about, category, commonUses } = req.body
            const { mid } = req.params
            if (!mid || !isNaN(mid)) {
                ErrorWrapper.createError({
                    name: 'mid is not valid',
                    cause: invalidFieldErrorInfo({
                        name: 'mid',
                        type: 'string',
                        value: mid,
                    }),
                    message: 'Error to update material',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }

            let query = { _id: mid }
            if (name) query.name = name
            if (description) query.description = description
            if (about) query.about = about
            if (files?.aboutImage) {
                const [aboutImage] = files.aboutImage
                query.aboutImage = await uploadImage({ image: aboutImage })
            }
            if (category) query.category = category
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

            const result = await this.materialRepository.updateMaterial({ material: query })

            return res.status(200).send({
                status: 'success',
                message: 'material successfully updated',
                data: result,
            })
        } catch (error) {
            handlerError(error, res)
        }
    }

    deleteMaterial = async (req, res) => {
        try {
            const { mid } = req.params
            if (!mid || !isNaN(mid)) {
                ErrorWrapper.createError({
                    name: 'mid is not valid',
                    cause: invalidFieldErrorInfo({
                        name: 'mid',
                        type: 'string',
                        value: mid,
                    }),
                    message: 'Error to delete material',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }

            await this.materialRepository.deleteMaterial({ mid })

            return res.status(204).send({})
        } catch (error) {
            handlerError(error, res)
        }
    }
}
