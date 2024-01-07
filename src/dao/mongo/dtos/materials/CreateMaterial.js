export class CreateMaterial {
    constructor(material) {
        this.name = material.name || null
        this.description = material.description || null
        this.category = material.category || null
        this.price = material.price || null
        this.thickness = material.thickness || null
        this.areaStandard = material.areaStandard || null
        this.weightAtomic = material.weightAtomic || null
        this.characteristics = material.characteristics || null
        this.urlImage = material.urlImage || null
    }
}
