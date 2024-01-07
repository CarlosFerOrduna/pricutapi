import { CategoryDAO } from '../../dao/index.js'
import { CreateCategory, SelectCategory, UpdateCategory } from '../../dao/mongo/dtos/index.js'

export class CategoryRepository {
    constructor() {
        this.dao = new CategoryDAO()
    }

    saveCategory = async (category) => {
        const createCategory = new CreateCategory(category)
        const categoryCreated = await this.dao.saveCategory(createCategory)

        return new SelectCategory(categoryCreated)
    }

    getCategoryById = async (cid) => {
        const category = await this.dao.getCategoryById(cid)

        return new SelectCategory(category)
    }

    searchCategories = async (limit, page, query) => {
        const {
            docs,
            totalPages,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        } = await this.dao.searchCategories(limit, page, query)

        return {
            categories: docs.map((m) => new SelectCategory(m.category)),
            totalPages,
            page,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        }
    }

    updateCategory = async (category) => {
        const updateCategory = new UpdateCategory(category)
        const categoryUpdated = await this.dao.updateCategory(updateCategory)

        return new SelectCategory(categoryUpdated)
    }

    deleteCategory = async (cid) => {
        return await this.dao.deleteCategory(cid)
    }
}
