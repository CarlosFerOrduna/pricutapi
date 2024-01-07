import { fileModel } from '../../models/index.js'

export class FileService {
    saveFile = async (file) => {
        try {
            const newFile = new fileModel(file)
            await newFile.validate()
            return await newFile.save()
        } catch (error) {
            throw new Error('fileService: ' + error)
        }
    }

    getFileById = async (fid) => {
        try {
            const result = await fileModel.findById(fid)
            if (!result) throw new Error('file not exists')

            return result
        } catch (error) {
            throw new Error('getFileById: ' + error)
        }
    }

    searchFiles = async (limit, page, query) => {
        try {
            return await fileModel.paginate(query, { limit: limit ?? 10, page: page ?? 1 })
        } catch (error) {
            throw new Error('getFiles: ' + error)
        }
    }

    updateFile = async (file) => {
        try {
            const result = await fileModel.findByIdAndUpdate(file._id, file)
            if (!result) throw new Error('file not exists')

            return result
        } catch (error) {
            throw new Error('updateFile: ' + error)
        }
    }

    deleteFile = async (fid) => {
        try {
            const result = await fileModel.findByIdAndDelete(fid)
            if (!result) throw new Error('file not exists')

            return result
        } catch (error) {
            throw new Error('deleteFile: ' + error)
        }
    }
}
