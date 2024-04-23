import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { UsersRepository } from '../../repositories/index.js'
import { isValidPassword } from '../../utils/bcrypt.util.js'
import { generateToken } from '../../utils/jwt.util.js'
import { handlerError } from '../../utils/handlerError.util.js'

export class UserController {
    constructor() {
        this.userRepository = new UsersRepository()
    }

    saveUser = async (req, res) => {
        try {
            const { firstName, lastName, email, password, rol } = req.body
            if (!firstName || !isNaN(firstName)) {
                ErrorWrapper.createError({
                    name: 'firstName is not valid',
                    cause: invalidFieldErrorInfo({
                        name: 'firstName',
                        type: 'string',
                        value: firstName,
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
        } catch (error) {
            handlerError(error, res)
        }
    }

    searchUsers = async (req, res) => {
        try {
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
        } catch (error) {
            handlerError(error, res)
        }
    }

    getUserById = async (req, res) => {
        try {
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
        } catch (error) {
            handlerError(error, res)
        }
    }

    updateUser = async (req, res) => {
        try {
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
        } catch (error) {
            handlerError(error, res)
        }
    }

    deleteUser = async (req, res) => {
        try {
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
        } catch (error) {
            handlerError(error, res)
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body
            if (!email || !email.match(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/)) {
                ErrorWrapper.createError({
                    name: 'email is not valid',
                    cause: invalidFieldErrorInfo({ name: 'email', type: 'string', value: email }),
                    message: 'Error to login user',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }
            if (!password) {
                ErrorWrapper.createError({
                    name: 'password is not valid',
                    cause: invalidFieldErrorInfo({
                        name: 'password',
                        type: 'string',
                        value: password,
                    }),
                    message: 'Error to login user',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }

            const user = await this.userRepository.getUserByEmail({ email })
            if (!isValidPassword(user, password)) {
                ErrorWrapper.createError({
                    name: 'password is not valid',
                    cause: invalidFieldErrorInfo({
                        name: 'password',
                        type: 'string',
                        value: password,
                    }),
                    message: 'Error to login user',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }

            const token = generateToken(user)

            return res.status(200).send({
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                },
                accessToken: token,
            })
        } catch (error) {
            handlerError(error, res)
        }
    }
}
