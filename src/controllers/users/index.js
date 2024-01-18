import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { UsersRepository } from '../../repositories/index.js'

export class UserController {
    constructor() {
        this.userRepository = new UsersRepository()
    }

    saveUser = async (req, res) => {
        const { firstName, lastName, email, password, rol } = req.body
        if (!firstName || !isNaN(firstName)) {
            ErrorWrapper.createError({
                name: 'cityOrigin is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'cityOrigin',
                    type: 'string',
                    value: cityOrigin,
                }),
                message: 'Error to save user',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!lastName || !isNaN(lastName)) {
            ErrorWrapper.createError({
                name: 'lastName is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'lastName',
                    type: 'string',
                    value: lastName,
                }),
                message: 'Error to save user',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!email || !isNaN(email)) {
            ErrorWrapper.createError({
                name: 'email is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'email',
                    type: 'string',
                    value: email,
                }),
                message: 'Error to save user',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!password || !isNaN(password)) {
            ErrorWrapper.createError({
                name: 'password is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'password',
                    type: 'string',
                    value: password,
                }),
                message: 'Error to save user',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.userRepository.saveUser({ user: { firstName, lastName, email, password, rol } })

        return res.status(201).send({
            status: 'success',
            message: 'user successfully created',
            data: result,
        })
    }

    searchUsers = async (req, res) => {
        const { limit, page, firstName, lastName, email, password, rol, files } = req.query

        let query = {}
        if (firstName) query.firstName = firstName
        if (lastName) query.lastName = lastName
        if (email) query.email = email
        if (password) query.password = password
        if (rol) query.rol = rol
        if (files) query.files = files

        const result = await this.userRepository.searchUsers({ limit, page, query })

        return res.status(200).send({
            status: 'success',
            message: 'user successfully found',
            data: result,
        })
    }

    getUserById = async (req, res) => {
        const { uid } = req.params
        if (!uid || !isNaN(uid)) {
            ErrorWrapper.createError({
                name: 'uid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'uid',
                    type: 'string',
                    value: uid,
                }),
                message: 'Error to get user',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.userRepository.getUserById({ uid })

        return res.status(200).send({
            status: 'success',
            message: 'user successfully found',
            data: result,
        })
    }

    updateUser = async (req, res) => {
        const { firstName, lastName, email, password, rol, files } = req.body
        const { uid } = req.params
        if (!uid || !isNaN(uid)) {
            ErrorWrapper.createError({
                name: 'uid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'uid',
                    type: 'string',
                    value: uid,
                }),
                message: 'Error to update user',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        let query = { _id: uid }
        if (firstName) query.firstName = firstName
        if (lastName) query.lastName = lastName
        if (email) query.email = email
        if (password) query.password = password
        if (rol) query.rol = rol
        if (files) query.files = files

        const result = await this.userRepository.updateUser({ user: query })

        return res.status(201).send({
            status: 'success',
            message: 'user successfully updated',
            data: result,
        })
    }

    deleteUser = async (req, res) => {
        const { uid } = req.params
        if (!uid || !isNaN(uid)) {
            ErrorWrapper.createError({
                name: 'uid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'uid',
                    type: 'string',
                    value: uid,
                }),
                message: 'Error to delete user',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        await this.userRepository.deleteUser({ uid })

        return res.status(204).send()
    }
}
