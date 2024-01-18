import moment from 'moment'
import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { createHash } from '../../../../utils/bcrypt.util.js'

const userSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        rol: { type: String, enum: ['admin', 'user'], default: 'user' },
        files: { type: [{ file: { type: Schema.Types.ObjectId, ref: 'files' } }] },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true },
)

userSchema.methods.softDelete = async function () {
    this.delete = true
    this.deletedAt = moment()

    return this.save()
}

userSchema.pre('save', function () {
    this.password = createHash(this.password)
})

userSchema.pre('find', function () {
    this.where({ deletedAt: null })
})

userSchema.plugin(paginate)

export const userModel = model('users', userSchema)
