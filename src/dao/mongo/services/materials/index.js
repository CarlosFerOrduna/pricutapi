import { ErrorWrapper, invalidFieldErrorInfo } from '../../../../middlewares/errors/index.js'
import { materialModel } from '../../models/index.js'

export class MaterialService {
    saveMaterial = async ({ material }) => {
        const newMaterial = new materialModel(material)
        await newMaterial.validate()

        return await newMaterial.save()
    }

    getMaterialById = async ({ mid }) => {
        const result = await materialModel.findById(mid).populate('category')
        if (!result) {
            ErrorWrapper.createError({
                name: 'material not exists',
                cause: invalidFieldErrorInfo({
                    name: 'material',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get material',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    searchMaterials = async ({ limit = 10, page = 1, query }) => {
        return await materialModel.paginate(query, { limit, page, populate: 'category' })
    }

    updateMaterial = async ({ material }) => {
        const result = await materialModel.findByIdAndUpdate(material._id, material, {
            new: true,
        })
        if (!result) {
            ErrorWrapper.createError({
                name: 'material not exists',
                cause: invalidFieldErrorInfo({
                    name: 'material',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to update material',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    deleteMaterial = async ({ mid }) => {
        const material = await materialModel.findById(mid)
        if (!material) {
            ErrorWrapper.createError({
                name: 'material not exists',
                cause: invalidFieldErrorInfo({
                    name: 'material',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to delete material',
                code: codes.DATABASE_ERROR,
            })
        }

        const result = await this.material.softDelete()

        return result
    }
}
