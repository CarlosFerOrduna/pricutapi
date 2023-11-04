import { Schema, model } from 'mongoose'
import { createHash } from '../utils/bcrypt.util.js'
import { paginate } from 'mongoose-paginate-v2'

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['admin', 'user'], default: 'user' },
    files: { type: [{ file: { type: Schema.Types.ObjectId, ref: 'files' } }] }
})

userSchema.plugin(paginate)

userSchema.pre('save', function () {
    this.password = createHash(this.password)
})

const userModel = model('users', userSchema)

export default userModel
