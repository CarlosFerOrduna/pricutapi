export class SelectShipment {
    constructor(shipment) {
        this._id = shipment._id || null
        this.city = shipment.city || null
        this.shipmentService = shipment.shipmentService || null
        this.streetName = shipment.streetName || null
        this.streetNumber = shipment.streetNumber || null
        this.floor = shipment.floor || null
        this.apartment = shipment.apartment || null
        this.zipCode = shipment.zipCode || null
        this.weight = shipment.weight || null
        this.long = shipment.long || null
        this.high = shipment.high || null
        this.width = shipment.width || null
        this.price = shipment.price || null
        this.deliveryStatus = shipment.deliveryStatus || null
    }
}
