import materialModel from '../models/materials.model.js'

export default class MaterialService {
    saveMaterial = async (material) => {
        try {
            const newMaterial = new materialModel(material)
            await newMaterial.validate()

            return await newMaterial.save()
        } catch (error) {
            throw new Error('saveMaterial: ' + error)
        }
    }

    getMaterialById = async (mid) => {
        try {
            const result = await materialModel.findById(mid).populate('categories.category')
            if (!result) throw new Error('material not exists')

            return result
        } catch (error) {
            throw new Error('getMaterialById: ' + error)
        }
    }

    searchMaterials = async (limit, page, query) => {
        try {
            return await materialModel.paginate(query, {
                limit: limit ?? 5,
                page: page ?? 1,
                populate: 'category'
            })
        } catch (error) {
            throw new Error('searchMaterials: ' + error)
        }
    }

    updateMaterial = async (material) => {
        try {
            const result = await materialModel.findByIdAndUpdate(material._id, material)
            if (!result) throw new Error('material not exists')

            return result
        } catch (error) {
            throw new Error('updateMaterial: ' + error)
        }
    }

    deleteMaterial = async (mid) => {
        try {
            const result = await materialModel.findByIdAndDelete(mid)
            if (!result) throw new Error('material not exists')

            return result
        } catch (error) {
            throw new Error('deleteMaterial: ' + error)
        }
    }
}
