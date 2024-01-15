import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { MaterialRepository } from '../../repositories/index.js'
import { uploadImage } from '../../utils/uploadImage.util.js'

export class MaterialController {
    constructor() {
        this.materialRepository = new MaterialRepository()
    }

    saveMaterial = async (req, res) => {
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
                message: 'Error to save article',
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
                message: 'Error to save article',
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
                message: 'Error to save article',
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
    }

    getMaterialById = async (req, res) => {
        const { mid } = req.params
        if (!mid || !isNaN(mid)) {
            ErrorWrapper.createError({
                name: 'mid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'mid',
                    type: 'string',
                    value: mid,
                }),
                message: 'Error to save article',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.materialRepository.getMaterialById({ mid })

        return res.status(200).send({
            status: 'success',
            message: 'material successfully found',
            data: result,
        })
    }

    searchMaterials = async (req, res) => {
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
    }

    updateMaterial = async (req, res) => {
        const {
            files: {
                small: [small],
                large: [large],
                aboutImage: [aboutImage],
                commonUsesImage: [commonUsesImage],
            },
        } = req
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
                message: 'Error to update article',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        let query = { _id: mid }

        if (name) query.name = name
        if (description) query.description = description
        if (about) query.about = about
        if (aboutImage) query.aboutImage = await uploadImage({ image: aboutImage })
        if (category) query.category = category
        if (commonUses) query.commonUses = commonUses
        if (commonUsesImage) query.commonUsesImage = await uploadImage({ image: commonUsesImage })
        if (small) query.urlImageSmall = await uploadImage({ image: small })
        if (large) query.urlImageLarge = await uploadImage({ image: large })

        const result = await this.materialRepository.updateMaterial({ query })

        return res.status(200).send({
            status: 'success',
            message: 'material successfully updated',
            data: result,
        })
    }

    deleteMaterial = async (req, res) => {
        const { mid } = req.params
        if (!mid || !isNaN(mid)) {
            ErrorWrapper.createError({
                name: 'mid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'mid',
                    type: 'string',
                    value: mid,
                }),
                message: 'Error to delete article',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        await this.materialRepository.deleteMaterial({ mid })

        return res.status(204).send({})
    }
}
