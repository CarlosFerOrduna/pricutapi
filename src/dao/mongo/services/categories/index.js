import {
    ErrorWrapper,
    codes,
    invalidFieldErrorInfo,
} from '../../../../middlewares/errors/index.js'
import { categoryModel } from '../../models/index.js'

export class CategoryService {
    saveCategory = async (category) => {
        const newCategory = new categoryModel(category)
        await newCategory.validate()

        return await newCategory.save()
    }

    getCategoryById = async (cid) => {
        const result = await categoryModel.findById(cid)
        if (!result) {
            ErrorWrapper.createError({
                name: 'category not exists',
                cause: invalidFieldErrorInfo({
                    name: 'category',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get category',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    searchCategories = async (limit = 10, page = 1, query) => {
        return await categoryModel.paginate(query, { limit, page })
    }

    updateCategory = async (category) => {
        const result = await categoryModel.findByIdAndUpdate(category._id, category, {
            new: true,
        })
        if (!result) {
            ErrorWrapper.createError({
                name: 'category not exists',
                cause: invalidFieldErrorInfo({
                    name: 'category',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to update category',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    deleteCategory = async (cid) => {
        const category = await categoryModel.findById(cid)
        if (!result) {
            ErrorWrapper.createError({
                name: 'category not exists',
                cause: invalidFieldErrorInfo({
                    name: 'category',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to delete category',
                code: codes.DATABASE_ERROR,
            })
        }

        const result = await category.softDelete()

        return result
    }
}
