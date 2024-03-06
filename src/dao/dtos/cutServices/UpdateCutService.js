export class UpdateCutService {
    constructor(service) {
        this._id = service._id
        if (service.name) this.name = service.name
        if (service.description) this.description = service.description
        if (service.cuttingCapacity) this.cuttingCapacity = service.cuttingCapacity
        if (service.supportedThickness) this.supportedThickness = service.supportedThickness
        if (service.about) this.about = service.about
        if (service.aboutImage) this.aboutImage = service.aboutImage
        if (service.commonUses) this.commonUses = service.commonUses
        if (service.commonUsesImage) this.commonUsesImage = service.commonUsesImage
        if (service.urlImageSmall) this.urlImageSmall = service.urlImageSmall
        if (service.urlImageLarge) this.urlImageLarge = service.urlImageLarge
    }
}
