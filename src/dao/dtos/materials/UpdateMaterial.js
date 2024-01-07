import {
    ErrorWrapper,
    codes,
    invalidFieldErrorInfo
} from '../../../middlewares/errors/index.js'

export class UpdateMaterial {
    constructor(material) {
        this._id =
            material._id ||
            ErrorWrapper.createError({
                name: '_id is not valid',
                cause: invalidFieldErrorInfo({ name: '_id', type: 'string', value: _id }),
                message: 'Error to update material',
                code: codes.INVALID_TYPES_ERROR
            })
        if (material.name) this.name = material.name
        if (material.description) this.description = material.description
        if (material.category) this.category = material.category
        if (material.price) this.price = material.price
        if (material.thickness) this.thickness = material.thickness
        if (material.areaStandard) this.areaStandard = material.areaStandard
        if (material.weightAtomic) this.weightAtomic = material.weightAtomic
        if (material.characteristics) this.characteristics = material.characteristics
        if (material.urlImage) this.urlImage = material.urlImage
    }
}
