export class CreateCity {
    constructor(city) {
        this.name = city.name || null
        this.shipmentService = city.shipmentService || null
        this.status = city.status || null
    }
}
