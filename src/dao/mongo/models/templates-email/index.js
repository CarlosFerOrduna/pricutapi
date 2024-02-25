import { Schema, model } from 'mongoose'

const templateEmailSchema = new Schema(
    {
        name: { type: String, required: true, index: true, unique: true },
        from: [{ email: { type: String, required: true }, name: { type: String, required: false } }],
        subject: { type: String, required: true },
        text: { type: String, default: null },
        html: { type: String, default: null },
        attachments: [{ filename: String, content: String }],
        alternatives: [{ contentType: { type: String }, content: { type: String } }],
        status: { type: String, enum: ['enable', 'disable'], default: 'enable' },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true },
)

templateEmailSchema.methods.softDelete = function () {
    this.deleted = true
    this.deletedAt = new Date()

    return this.save()
}

templateEmailSchema.pre('find', function () {
    this.where({ deletedAt: null })
})

export const templateEmailModel = model('templatesEmail', templateEmailSchema)
