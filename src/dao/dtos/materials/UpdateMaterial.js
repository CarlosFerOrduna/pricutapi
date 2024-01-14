export class UpdateMaterial {
    constructor(material) {
        this._id = material._id
        if (material.name) this.name = material.name
        if (material.description) this.description = material.description
        if (material.about) this.about = material.about
        if (material.aboutImage) this.aboutImage = material.aboutImage
        if (material.category) this.category = material.category
        if (material.commonUses) this.commonUses = material.commonUses
        if (material.commonUsesImage) this.commonUsesImage = material.commonUsesImage
        if (material.urlImageSmall) this.urlImageSmall = material.urlImageSmall
        if (material.urlImageLarge) this.urlImageLarge = material.urlImageLarge
    }
}
