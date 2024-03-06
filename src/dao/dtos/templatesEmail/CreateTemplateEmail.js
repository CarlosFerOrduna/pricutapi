export class CreateTemplateEmail {
    constructor(templateEmail) {
        this.name = templateEmail.name || null
        this.from = templateEmail.from || null
        this.subject = templateEmail.subject || null
        this.text = templateEmail.text || null
        this.html = templateEmail.html || null
        this.attachments = templateEmail.attachments || null
        this.alternatives = templateEmail.alternatives || null
        this.status = templateEmail.status || null
    }
}
