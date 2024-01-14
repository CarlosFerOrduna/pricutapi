export class SelectService {
    constructor(service) {
        this._id = service._id || null
        this.name = service.name || null
        this.description = service.description || null
        this.cuttingCapacity = service.cuttingCapacity || null
        this.supportedThickness = service.supportedThickness || null
        this.about = service.About || null
        this.aboutImage = service.AboutImage || null
        this.commonUses = service.commonUses || null
        this.commonUsesImage = service.commonUsesImage || null
        this.urlImageSmall = service.urlImageSmall || null
        this.urlImageLarge = service.urlImageLarge || null
    }
}
