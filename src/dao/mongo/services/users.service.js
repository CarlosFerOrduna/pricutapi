import userModel from '../models/users.model.js'

export default class UserService {
    createUser = async (user) => {
        try {
            const newUser = new userModel(user)
            await newUser.validate()

            return await newUser.save()
        } catch (error) {
            throw new Error('insertUser: ' + error)
        }
    }

    getUserById = async (uid) => {
        try {
            const user = await userModel.findById(uid).populate('files.file')
            if (!user) throw new Error('user not exists')

            return user
        } catch (error) {
            throw new Error('getUserById: ' + error)
        }
    }

    getUserByEmail = async (email) => {
        try {
            const user = await userModel.findOne({ email }).populate('files.file')
            if (!user) throw new Error('user not exists')

            return user
        } catch (error) {
            throw new Error('getUserByEmail: ' + error)
        }
    }

    searchUsers = async (limit, page, query) => {
        try {
            return await userModel.paginate(query, {
                limit: limit ?? 10,
                page: page ?? 1,
                populate: 'file'
            })
        } catch (error) {
            throw new Error('getUsers: ' + error)
        }
    }

    updateUser = async (user) => {
        try {
            const userUpdated = await userModel.findByIdAndUpdate(user._id, user)
            if (!userUpdated) throw new Error('user not exists')

            return userUpdated
        } catch (error) {
            throw new Error('updateUser: ' + error)
        }
    }

    deleteUser = async (uid) => {
        try {
            const user = await userModel.findByIdAndDelete(uid)
            if (!user) throw new Error('user not exists')

            return user
        } catch (error) {
            throw new Error('deleteUser: ' + error)
        }
    }
}
