export class CreateCategory {
    constructor(category) {
        this.name = category.name || null
        this.description = category.description || null
    }
}
