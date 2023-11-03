import categoryModel from '../models/categories.model.js'

export default class CategoryService {
    saveCategory = async (category) => {
        try {
            const newCategory = new categoryModel(category)
            await newCategory.validate()

            return await newCategory.save()
        } catch (error) {
            throw new Error('categoryService: ' + error)
        }
    }

    getCategoryById = async (cid) => {
        try {
            const result = await categoryModel.findById(cid)
            if (!result) throw new Error('category not exists')

            return result
        } catch (error) {
            throw new Error('getCategoryById: ' + error)
        }
    }

    getCategories = async () => {
        try {
            return await categoryModel.find({})
        } catch (error) {
            throw new Error('getCategorys: ' + error)
        }
    }

    updateCategory = async (category) => {
        try {
            const result = await categoryModel.findByIdAndUpdate(category._id, category)
            if (!result) throw new Error('category not exists')

            return result
        } catch (error) {
            throw new Error('updatecategory: ' + error)
        }
    }

    deleteCategory = async (cid) => {
        try {
            const result = await categoryModel.findByIdAndDelete(cid)
            if (!result) throw new Error('category not exists')

            return result
        } catch (error) {
            throw new Error('deletecategory: ' + error)
        }
    }
}
