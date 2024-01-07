export class CreateUser {
    constructor(user) {
        this.firstName = user.firstName || null
        this.lastName = user.lastName || null
        this.email = user.email || null
        this.password = user.password || null
        this.rol = user.rol || null
        this.files = user.files || null
        this.thumbnail = user.thumbnail || null
    }
}
