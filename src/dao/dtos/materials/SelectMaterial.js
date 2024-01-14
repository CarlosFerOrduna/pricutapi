import { SelectCategory } from '../categories/SelectCategory.js'

export class SelectMaterial {
    constructor(material) {
        this._id = material._id || null
        this.name = material.name || null
        this.description = material.description || null
        this.about = material.about
        this.aboutImage = material.aboutImage || null
        this.category = new SelectCategory(material.category) || null
        this.commonUses = material.commonUses || null
        this.commonUsesImage = material.commonUsesImage || null
        this.urlImageSmall = material.urlImageSmall || null
        this.urlImageLarge = material.urlImageLarge || null
    }
}
