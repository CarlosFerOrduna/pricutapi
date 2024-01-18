import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../../../middlewares/errors/index.js'
import { userModel } from '../../models/index.js'

export class UserService {
    saveUser = async ({ user }) => {
        const newUser = new userModel(user)
        await newUser.validate()

        return await newUser.save()
    }

    getUserById = async ({ uid }) => {
        const result = await userModel.findById(uid)
        if (!result) {
            ErrorWrapper.createError({
                name: 'user not exists',
                cause: invalidFieldErrorInfo({
                    name: 'user',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get users',
                code: codes.NOT_FOUND,
            })
        }

        if (result && result.files && result.files.length > 0 && result.files[0].file) {
            result.populate('files.file').execPopulate()
        }

        return result
    }

    getUserByEmail = async ({ email }) => {
        const result = await userModel.findOne({ email })
        if (!result) {
            ErrorWrapper.createError({
                name: 'user not exists',
                cause: invalidFieldErrorInfo({
                    name: 'user',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get users',
                code: codes.NOT_FOUND,
            })
        }

        if (result && result.files && result.files.length > 0 && result.files[0].file) {
            result.populate('files.file').execPopulate()
        }

        return result
    }

    searchUsers = async ({ limit = 10, page = 1, query }) => {
        const result = await userModel.paginate(query, { limit, page })

        if (result.docs.length > 0 && result.docs[0].files && result.docs[0].files.length > 0) {
            await userModel.populate(result.docs, { path: 'files.file' })
        }

        return result
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
                code: codes.NOT_FOUND,
            })
        }

        return result
    }

    deleteUser = async ({ uid }) => {
        const user = await userModel.findById(uid)
        if (!user) {
            ErrorWrapper.createError({
                name: 'user not exists',
                cause: invalidFieldErrorInfo({
                    name: 'user',
                    type: 'string',
                    value: user,
                }),
                message: 'Error to delete users',
                code: codes.NOT_FOUND,
            })
        }

        const result = await user.softDelete()

        return result
    }
}
