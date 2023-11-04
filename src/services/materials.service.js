import materialModel from '../models/materials.model.js'

export default class MaterialService {
    saveMaterial = async (material) => {
        try {
            const newMaterial = new materialModel(material)
            await newMaterial.validate()

            return await newMaterial.save()
        } catch (error) {
            throw new Error('materialService: ' + error)
        }
    }

    getMaterialById = async (mid) => {
        try {
            const result = await materialModel.findById(mid)
            if (!result) throw new Error('material not exists')

            return result
        } catch (error) {
            throw new Error('getMaterialById: ' + error)
        }
    }

    searchMaterials = async (limit, page, query) => {
        try {
            return await materialModel.paginate(query, { limit: limit ?? 5, page: page ?? 1 })
        } catch (error) {
            throw new Error('getMaterials: ' + error)
        }
    }

    updateMaterial = async (material) => {
        try {
            const result = await materialModel.findByIdAndUpdate(material._id, material)
            if (!result) throw new Error('material not exists')

            return result
        } catch (error) {
            throw new Error('updatematerial: ' + error)
        }
    }

    deleteMaterial = async (mid) => {
        try {
            const result = await materialModel.findByIdAndDelete(mid)
            if (!result) throw new Error('material not exists')

            return result
        } catch (error) {
            throw new Error('deletematerial: ' + error)
        }
    }
}
