import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { createHash } from '../../../../utils/bcrypt.util.js'

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['admin', 'user'], default: 'user' },
    files: { type: [{ file: { type: Schema.Types.ObjectId, ref: 'files' } }] },
    thumbnail: { type: String }
})

userSchema.pre('save', function () {
    this.password = createHash(this.password)
})

userSchema.plugin(paginate)

export const userModel = model('users', userSchema)
