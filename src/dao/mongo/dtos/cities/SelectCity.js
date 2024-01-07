export class SelectCity {
    constructor(city) {
        this._id = city._id || null
        this.key = city.key || null
        this.value = city.value || null
    }
}
