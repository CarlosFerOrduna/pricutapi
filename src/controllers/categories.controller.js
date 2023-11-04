import CategoryService from '../services/categories.service.js'

class CategoryController {
    constructor() {
        this.categoryService = new CategoryService()
    }

    saveCategory = async (req, res) => {
        try {
            const { name, description } = req.body
            if (!name) throw new Error('name is not valid')
            if (!description) throw new Error('description is not valid')

            const result = await this.categoryService.saveCategory({ name, description })

            return res.status(201).json({
                status: 'success',
                message: 'category successfully created',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    getCategoryById = async (req, res) => {
        try {
            const { cid } = req.params
            if (!cid || !isNaN(cid)) throw new Error('cid is required, or is not valid')

            const result = await this.categoryService.getCategoryById(cid)

            return res.status(200).json({
                status: 'success',
                message: 'category successfully found',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    searchCategories = async (req, res) => {
        try {
            const { limit, page, name, description } = req.query

            let query = {}
            if (name) query.name = name
            if (description) query.description = description

            const result = await this.categoryService.searchCategories(limit, page, query)

            return res.status(200).json({
                status: 'success',
                message: 'all category',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    updateCategory = async (req, res) => {
        try {
            const { name, description } = req.body
            let newCategory = {}

            if (name) newCategory.name = name
            if (description) newCategory.description = description

            const result = await this.categoryService.updateCategory(newCategory)

            return res.status(200).json({
                status: 'success',
                message: 'category successfully updated',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    deleteCategory = async (req, res) => {
        try {
            const { mid } = req.params
            await this.categoryService.deleteCategory(mid)

            return res.status(204).json({})
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }
}

const categoryController = new CategoryController()

export default categoryController
