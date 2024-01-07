export class SelectCategory {
    constructor(category) {
        this._id = category._id || null
        this.name = category.name || null
        this.description = category.description || null
    }
}
