import {
    ErrorWrapper,
    codes,
    invalidFieldErrorInfo,
} from '../../../../middlewares/errors/index.js'
import { userModel } from '../../models/index.js'

export class UserService {
    createUser = async ({ user }) => {
        const newUser = new userModel(user)
        await newUser.validate()

        return await newUser.save()
    }

    getUserById = async ({ uid }) => {
        const result = await userModel.findById(uid).populate('file')
        if (!result) {
            ErrorWrapper.createError({
                name: 'user not exists',
                cause: invalidFieldErrorInfo({
                    name: 'user',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get users',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    getUserByEmail = async ({ email }) => {
        const result = await userModel.findOne({ email }).populate('file')
        if (!result) {
            ErrorWrapper.createError({
                name: 'user not exists',
                cause: invalidFieldErrorInfo({
                    name: 'user',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get users',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    searchUsers = async ({ limit = 10, page = 1, query }) => {
        return await userModel.paginate(query, { limit, page, populate: 'file' })
    }

    updateUser = async ({ user }) => {
        const result = await userModel.findByIdAndUpdate(user._id, user, { new: true })
        if (!result) {
            ErrorWrapper.createError({
                name: 'user not exists',
                cause: invalidFieldErrorInfo({
                    name: 'user',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to update users',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    deleteUser = async ({ uid }) => {
        const user = await userModel.findByIdAndDelete(uid)
        if (!user) {
            ErrorWrapper.createError({
                name: 'user not exists',
                cause: invalidFieldErrorInfo({
                    name: 'user',
                    type: 'string',
                    value: user,
                }),
                message: 'Error to delete users',
                code: codes.DATABASE_ERROR,
            })
        }

        const result = await userModel.softDelete()

        return result
    }
}
