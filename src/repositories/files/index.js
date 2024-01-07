import { FileDAO } from '../../dao/index.js'
import { CreateFile, SelectFile, UpdateFile } from '../../dao/mongo/dtos/index.js'

export class FileRepository {
    constructor() {
        this.dao = new FileDAO()
    }

    saveFile = async (file) => {
        const createFile = new CreateFile(file)
        const fileCreated = await this.dao.saveFile(createFile)

        return new SelectFile(fileCreated)
    }

    getFileById = async (fid) => {
        const file = await this.dao.getFileById(fid)

        return new SelectFile(file)
    }

    searchFiles = async (limit, page, query) => {
        const {
            docs,
            totalPages,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        } = await this.dao.searchFiles(limit, page, query)

        return {
            files: docs.map((m) => new SelectFile(m.file)),
            totalPages,
            page,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        }
    }

    updateFile = async (file) => {
        const updateFile = new UpdateFile(file)
        const fileUpdated = await this.dao.updateFile(updateFile)

        return new SelectFile(fileUpdated)
    }

    deleteFile = async (aid) => {
        return await this.dao.deleteFile(aid)
    }
}
