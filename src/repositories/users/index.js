import { userDAO } from '../../dao/index.js'
import { CreateUser, SelectUser, UpdateUser } from '../../dao/dtos/index.js'

export class UsersRepository {
    constructor() {
        this.dao = userDAO
    }

    saveUser = async ({ user }) => {
        const createUser = new CreateUser(user)
        const userCreated = await this.dao.saveUser({ user: createUser })

        return new SelectUser(userCreated)
    }

    getUserById = async ({ uid }) => {
        const user = await this.dao.getUserById({ uid })

        return new SelectUser(user)
    }

    getUserByEmail = async ({ email }) => {
        const user = await this.dao.getUserByEmail({ email })

        return new SelectUser(user)
    }

    searchUsers = async ({ limit, page, query }) => {
        const { docs, totalPages, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage } =
            await this.dao.searchUsers({ limit, page, query })

        return {
            users: docs.map((u) => new SelectUser(u)),
            totalPages,
            page,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        }
    }

    updateUser = async ({ user }) => {
        const updateUser = new UpdateUser(user)
        const userUpdated = await this.dao.updateUser({ user: updateUser })

        return new SelectUser(userUpdated)
    }

    deleteUser = async ({ uid }) => {
        return await this.dao.deleteUser({ uid })
    }
}
