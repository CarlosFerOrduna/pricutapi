import { SelectCategory } from '../categories/SelectCategory.js'

export class SelectMaterial {
    constructor(material) {
        this._id = material._id || null
        this.name = material.name || null
        this.description = material.description || null
        this.category = new SelectCategory(material.category)
        this.price = material.price || null
        this.thickness = material.thickness || null
        this.areaStandard = material.areaStandard || null
        this.weightAtomic = material.weightAtomic || null
        this.characteristics = material.characteristics || null
        this.urlImage = material.urlImage || null
    }
}
