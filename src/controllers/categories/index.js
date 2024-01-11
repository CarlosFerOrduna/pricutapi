import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { CategoryRepository } from '../../repositories/index.js'

export class CategoryController {
    constructor() {
        this.categoryRepository = new CategoryRepository()
    }

    saveCategory = async (req, res) => {
        const { name, description } = req.body
        if (!name) {
            ErrorWrapper.createError({
                name: 'name is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'name',
                    type: 'string',
                    value: name
                }),
                message: 'Error to save category',
                code: codes.INVALID_TYPES_ERROR
            })
        }
        if (!description) {
            ErrorWrapper.createError({
                name: 'description is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'description',
                    type: 'string',
                    value: description
                }),
                message: 'Error to save category',
                code: codes.INVALID_TYPES_ERROR
            })
        }

        const result = await this.categoryRepository.saveCategory({ name, description })

        return res.status(201).send({
            status: 'success',
            message: 'category successfully created',
            data: result
        })
    }

    getCategoryById = async (req, res) => {
        const { cid } = req.params
        if (!cid || !isNaN(cid)) {
            ErrorWrapper.createError({
                name: 'cid is required, or is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'cid',
                    type: 'string',
                    value: cid
                }),
                message: 'Error to get category',
                code: codes.INVALID_TYPES_ERROR
            })
        }

        const result = await this.categoryRepository.getCategoryById(cid)

        return res.status(200).send({
            status: 'success',
            message: 'category successfully found',
            data: result
        })
    }

    searchCategories = async (req, res) => {
        const { limit, page, name, description } = req.query

        let query = {}
        if (name) query.name = name
        if (description) query.description = description

        const result = await this.categoryRepository.searchCategories(limit, page, query)

        return res.status(200).send({
            status: 'success',
            message: 'all category',
            data: result
        })
    }

    updateCategory = async (req, res) => {
        const { name, description } = req.body

        let query = {}
        if (name) query.name = name
        if (description) query.description = description

        const result = await this.categoryRepository.updateCategory(query)

        return res.status(200).send({
            status: 'success',
            message: 'category successfully updated',
            data: result
        })
    }

    deleteCategory = async (req, res) => {
        const { cid } = req.params

        if (!cid) {
            ErrorWrapper.createError({
                name: 'cid is required, or is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'cid',
                    type: 'string',
                    value: cid
                }),
                message: 'Error to get category',
                code: codes.INVALID_TYPES_ERROR
            })
        }

        await this.categoryRepository.deleteCategory(cid)

        return res.status(204).send()
    }
}
