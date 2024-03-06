export class SelectCity {
    constructor(city) {
        this._id = city._id || null
        this.name = city.name || null
        this.shipmentService = city.shipmentService || null
        this.status = city.status || null
    }
}
