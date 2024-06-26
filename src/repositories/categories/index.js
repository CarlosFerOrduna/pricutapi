import { categoryDAO } from '../../dao/index.js'
import { CreateCategory, SelectCategory, UpdateCategory } from '../../dao/dtos/index.js'

export class CategoryRepository {
    constructor() {
        this.dao = categoryDAO
    }

    saveCategory = async ({ category }) => {
        const createCategory = new CreateCategory(category)
        const categoryCreated = await this.dao.saveCategory({ category: createCategory })

        return new SelectCategory(categoryCreated)
    }

    getCategoryById = async ({ cid }) => {
        const category = await this.dao.getCategoryById({ cid })

        return new SelectCategory(category)
    }

    searchCategories = async ({ limit, page, query }) => {
        const {
            docs,
            totalPages,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        } = await this.dao.searchCategories({ limit, page, query })

        return {
            categories: docs.map((c) => new SelectCategory(c)),
            totalPages,
            page,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        }
    }

    updateCategory = async ({ category }) => {
        const updateCategory = new UpdateCategory(category)
        const categoryUpdated = await this.dao.updateCategory({ category: updateCategory })

        return new SelectCategory(categoryUpdated)
    }

    deleteCategory = async ({ cid }) => {
        return await this.dao.deleteCategory({ cid })
    }
}
