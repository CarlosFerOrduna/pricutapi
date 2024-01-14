export class UpdateProduct {
    constructor(product) {
        this._id = product._id
        if (product.material) this.material = product.material
        if (product.code) this.code = product.code
        if (product.pricePerPlank) this.pricePerPlank = product.pricePerPlank
        if (product.priceSalePlank) this.priceSalePlank = product.priceSalePlank
        if (product.width) this.width = product.width
        if (product.height) this.height = product.height
        if (product.thickness) this.thickness = product.thickness
        if (product.area) this.area = product.area
        if (product.volume) this.volume = product.volume
        if (product.specificWeight) this.specificWeight = product.specificWeight
        if (product.priceSquareCm) this.priceSquareCm = product.priceSquareCm
        if (product.fiberLaser) this.fiberLaser = product.fiberLaser
        if (product.CO2Laser) this.CO2Laser = product.CO2Laser
        if (product.CNCRouter) this.CNCRouter = product.CNCRouter
    }
}
