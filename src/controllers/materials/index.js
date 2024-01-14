import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { MaterialRepository } from '../../repositories/index.js'

export class MaterialController {
    constructor() {
        this.materialRepository = new MaterialRepository()
    }

    saveMaterial = async (req, res) => {
        const {
            name,
            description,
            about,
            aboutImage,
            category,
            commonUses,
            commonUsesImage,
            urlImageSmall,
            urlImageLarge,
        } = req.body
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

        const result = await this.materialRepository.saveMaterial({
            material: {
                name,
                description,
                about,
                aboutImage,
                category,
                commonUses,
                commonUsesImage,
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
        const {
            limit,
            page,
            name,
            description,
            about,
            aboutImage,
            category,
            commonUses,
            commonUsesImage,
            urlImageSmall,
            urlImageLarge,
        } = req.query

        let query = {}
        if (name) query.name = name
        if (description) query.description = description
        if (about) query.about = about
        if (aboutImage) query.aboutImage = aboutImage
        if (category) query.category = category
        if (commonUses) query.commonUses = commonUses
        if (commonUsesImage) query.commonUsesImage = commonUsesImage
        if (urlImageSmall) query.urlImageSmall = urlImageSmall
        if (urlImageLarge) query.urlImageLarge = urlImageLarge

        const result = await this.materialRepository.searchMaterials({ limit, page, query })

        return res.status(200).send({
            status: 'success',
            message: 'all material',
            data: result,
        })
    }

    updateMaterial = async (req, res) => {
        const {
            name,
            description,
            about,
            aboutImage,
            category,
            commonUses,
            commonUsesImage,
            urlImageSmall,
            urlImageLarge,
        } = req.body
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
        if (aboutImage) query.aboutImage = aboutImage
        if (category) query.category = category
        if (commonUses) query.commonUses = commonUses
        if (commonUsesImage) query.commonUsesImage = commonUsesImage
        if (urlImageSmall) query.urlImageSmall = urlImageSmall
        if (urlImageLarge) query.urlImageLarge = urlImageLarge

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
