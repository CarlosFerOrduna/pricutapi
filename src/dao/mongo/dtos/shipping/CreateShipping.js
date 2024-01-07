export class CreateShipping {
    constructor(shipping) {
        this.cityOrigin = shipping.cityOrigin || null
        this.cityDestination = shipping.cityDestination || null
        this.weight = shipping.weight || null
        this.long = shipping.long || null
        this.high = shipping.high || null
        this.width = shipping.width || null
        this.price = shipping.price || null
    }
}
