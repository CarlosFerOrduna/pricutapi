import {
    ErrorWrapper,
    codes,
    invalidFieldErrorInfo,
} from '../../../../middlewares/errors/index.js'
import { fileModel } from '../../models/index.js'

export class FileService {
    saveFile = async ({ file }) => {
        const newFile = new fileModel(file)
        await newFile.validate()

        return await newFile.save()
    }

    getFileById = async ({ fid }) => {
        const result = await fileModel.findById(fid)
        if (!result) {
            ErrorWrapper.createError({
                name: 'file not exists',
                cause: invalidFieldErrorInfo({
                    name: 'file',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get file',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    searchFiles = async ({ limit = 10, page = 1, query }) => {
        return await fileModel.paginate(query, { limit, page })
    }

    updateFile = async ({ file }) => {
        const result = await fileModel.findByIdAndUpdate(file._id, file, { new: true })
        if (!result) {
            ErrorWrapper.createError({
                name: 'file not exists',
                cause: invalidFieldErrorInfo({
                    name: 'file',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to update file',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    deleteFile = async ({ fid }) => {
        const file = await fileModel.findById(fid)
        if (!file) {
            ErrorWrapper.createError({
                name: 'file not exists',
                cause: invalidFieldErrorInfo({
                    name: 'file',
                    type: 'string',
                    value: file,
                }),
                message: 'Error to delete file',
                code: codes.DATABASE_ERROR,
            })
        }

        const result = await file.softDelete()

        return result
    }
}
