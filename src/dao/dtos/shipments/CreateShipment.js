export class CreateShipment {
    constructor(shipment) {
        this.cityOrigin = shipment.cityOrigin || null
        this.cityDestination = shipment.cityDestination || null
        this.weight = shipment.weight || null
        this.long = shipment.long || null
        this.high = shipment.high || null
        this.width = shipment.width || null
        this.price = shipment.price || null
    }
}
