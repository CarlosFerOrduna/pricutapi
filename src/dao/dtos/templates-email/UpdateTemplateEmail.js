export class UpdateTemplateEmail {
    constructor(templateEmail) {
        const { _id, name, from, subject, text, html, attachments, alternatives, status } = templateEmail

        if (_id) this._id = _id
        if (name) this.name = name
        if (from) this.from = from
        if (subject) this.subject = subject
        if (text) this.text = text
        if (html) this.html = html
        if (attachments) this.attachments = attachments
        if (alternatives) this.alternatives = alternatives
        if (status) this.status = status
    }
}
