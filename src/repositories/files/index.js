import { fileDAO } from '../../dao/index.js'
import { CreateFile, SelectFile, UpdateFile } from '../../dao/dtos/index.js'

export class FileRepository {
    constructor() {
        this.dao = fileDAO
    }

    saveFile = async ({ file }) => {
        const createFile = new CreateFile(file)
        const fileCreated = await this.dao.saveFile({ file: createFile })

        return new SelectFile(fileCreated)
    }

    getFileById = async ({ fid }) => {
        const file = await this.dao.getFileById({ fid })

        return new SelectFile(file)
    }

    searchFiles = async ({ limit, page, query }) => {
        const { docs, totalPages, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage } =
            await this.dao.searchFiles({ limit, page, query })

        return {
            files: docs.map((f) => {
                const { _id, name, url } = new SelectFile(f)
                return { _id, name, url }
            }),
            totalPages,
            page,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        }
    }

    updateFile = async ({ file }) => {
        const updateFile = new UpdateFile(file)
        const fileUpdated = await this.dao.updateFile({ file: updateFile })

        return new SelectFile(fileUpdated)
    }

    deleteFile = async ({ fid }) => {
        return await this.dao.deleteFile({ fid })
    }
}
