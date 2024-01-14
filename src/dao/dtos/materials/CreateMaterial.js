export class CreateMaterial {
    constructor(material) {
        this.name = material.name || null
        this.description = material.description || null
        this.about = material.about || null
        this.aboutImage = material.aboutImage || null
        this.category = material.category || null
        this.commonUses = material.commonUses || null
        this.commonUsesImage = material.commonUsesImage || null
        this.urlImageSmall = material.urlImageSmall || null
        this.urlImageLarge = material.urlImageLarge || null
    }
}
