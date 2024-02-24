export class SelectFile {
    constructor(file) {
        this._id = file._id || null
        this.name = file.name || null
        this.url = file.url || null
    }
}
