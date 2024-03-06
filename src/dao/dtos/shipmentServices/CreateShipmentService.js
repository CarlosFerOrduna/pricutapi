export class CreateShipmentService {
    constructor(shipmentService) {
        this.name = shipmentService.name || null
        this.standardPrice = shipmentService.standardPrice || null
        this.standardWeight = shipmentService.standardWeight || null
        this.pricePerKiloExtra = shipmentService.pricePerKiloExtra || null
        this.EstimatedDeliveryTime = shipmentService.EstimatedDeliveryTime || null
    }
}
