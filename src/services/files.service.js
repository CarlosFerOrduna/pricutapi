import fileModel from '../models/files.model.js'

export default class FileService {
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

    getFiles = async () => {
        try {
            return await fileModel.find({})
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