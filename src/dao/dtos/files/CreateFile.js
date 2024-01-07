export class CreateFile {
    constructor(file) {
        this.name = file.name || null
        this.file = file.file || null
        this.url = file.url || null
    }
}
