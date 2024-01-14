export class SelectProduct {
    constructor(product) {
        this._id = product._id || null
        this.material = product.material || null
        this.code = product.code || null
        this.pricePerPlank = product.pricePerPlank || null
        this.priceSalePlank = product.priceSalePlank || null
        this.width = product.width || null
        this.height = product.height || null
        this.thickness = product.thickness || null
        this.area = product.area || null
        this.volume = product.volume || null
        this.specificWeight = product.specificWeight || null
        this.priceSquareCm = product.priceSquareCm || null
        this.fiberLaser = product.fiberLaser || null
        this.CO2Laser = product.CO2Laser || null
        this.CNCRouter = product.CNCRouter || null
    }
}
