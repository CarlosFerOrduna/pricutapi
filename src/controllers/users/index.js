import UserService from '../services/users.service.js'
import { createHash, isValidPassword } from '../../utils/bcrypt.util.js'
import { generateToken } from '../../utils/jwt.util.js'

class UserController {
    constructor() {
        this.userService = new UserService()
    }

    createUser = async (req, res) => {
        try {
            const { firstName, lastName, email, password, rol } = req.body
            if (!firstName || !isNaN(firstName)) throw new Error('firstName is not valid')
            if (!lastName || !isNaN(lastName)) throw new Error('lastName is not valid')
            if (!email || !isNaN(email)) throw new Error('email is not valid')
            if (!password || !isNaN(password)) throw new Error('password is not valid')

            const result = await this.userService.createUser({
                firstName,
                lastName,
                email,
                password,
                rol
            })

            return res.status(201).json({
                status: 'success',
                message: 'user successfully created',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
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

            const result = await this.userService.searchUsers(limit, page, query)

            return res.status(200).json({
                status: 'success',
                message: 'user successfully found',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    getUserById = async (req, res) => {
        try {
            const { uid } = req.params
            if (!uid || !isNaN(uid)) throw new Error('uid is not valid')

            const result = await this.userService.getUserById(uid)

            return res.status(200).json({
                status: 'success',
                message: 'user successfully found',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    updateUser = async (req, res) => {
        try {
            const { firstName, lastName, email, password, rol } = req.body
            let newUser = {}

            if (firstName) newUser.firstName = firstName
            if (lastName) newUser.lastName = lastName
            if (email) newUser.email = email
            if (password) newUser.password = createHash(password)
            if (rol) newUser.rol = rol

            const result = await this.userService.updateUser(newUser)

            return res.status(201).json({
                status: 'success',
                message: 'user successfully updated',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { uid } = req.params
            if (!uid || !isNaN(uid)) throw new Error('uid is not valid')

            await this.userService.deleteUser(uid)

            return res.status(204).json({})
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body
            if (!email || !email.includes('@')) throw new Error('email is not valid')
            if (!password) throw new Error('password is not valid')

            const data = await this.userService.getUserByEmail(email)

            if (!isValidPassword(data, password))
                throw new Error('something went wrong: ' + data)

            const token = generateToken(data)

            req.session.user = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                rol: data.rol
            }

            return res.status(200).header('authorization', token).json({
                user: data,
                accessToken: token
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }
}

const userController = new UserController()

export default userController
