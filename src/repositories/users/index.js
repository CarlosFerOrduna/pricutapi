import { UserDAO } from '../../dao/index.js'
import { CreateUser, SelectUser, UpdateUser } from '../../dao/dtos/index.js'

export class UsersRepository {
    constructor() {
        this.dao = new UserDAO()
    }

    saveUser = async (user) => {
        const createUser = new CreateUser(user)
        const userCreated = await this.dao.saveUser(createUser)

        return new SelectUser(userCreated)
    }

    getUserById = async (uid) => {
        const user = await this.dao.getUserById(uid)

        return new SelectUser(user)
    }

    searchUsers = async (limit, page, query) => {
        const {
            docs,
            totalPages,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        } = await this.dao.searchUsers(limit, page, query)

        return {
            users: docs.map((u) => new SelectUser(u)),
            totalPages,
            page,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        }
    }

    updateUser = async (user) => {
        const updateUser = new UpdateUser(user)
        const userUpdated = await this.dao.updateUser(updateUser)

        return new SelectUser(userUpdated)
    }

    deleteUser = async (aid) => {
        return await this.dao.deleteUser(aid)
    }
}
