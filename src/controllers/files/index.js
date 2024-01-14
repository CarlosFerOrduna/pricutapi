import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { FileRepository } from '../../repositories/index.js'
import { calculateDimensions, calculatePrice } from '../../utils/dxfParser.util.js'
import { ConvertDxfToSvg } from '../../utils/dxfToSvg.util.js'
import { uploadImage } from '../../utils/uploadImage.util.js'

export class FileController {
    constructor() {
        this.fileRepository = new FileRepository()
    }

    saveFile = async (req, res) => {
        const { originalname, buffer } = req.file
        if (!originalname) {
            ErrorWrapper.createError({
                name: 'originalname is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'originalname',
                    type: 'string',
                    value: originalname,
                }),
                message: 'Error to create file',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!buffer) {
            ErrorWrapper.createError({
                name: 'buffer is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'buffer',
                    type: 'string',
                    value: buffer,
                }),
                message: 'Error to create file',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const svg = ConvertDxfToSvg(buffer)
        const urlImage = await uploadImage(svg)

        const result = await this.fileRepository.saveFile({
            file: {
                name: originalname,
                file: buffer,
                url: urlImage,
            },
        })

        return res.status(201).send({
            status: 'success',
            message: 'file successfully created',
            data: {
                _id: result._id,
                name: result.name,
                url: result.url,
                dimensions: calculateDimensions(result.file),
                file: result.file,
            },
        })
    }

    getFileByIdWithPrice = async (req, res) => {
        const { fid, mid } = req.params
        if (!fid || !isNaN(fid)) {
            ErrorWrapper.createError({
                name: 'fid is required, or is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'fid',
                    type: 'string',
                    value: fid,
                }),
                message: 'Error to get file',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!mid || !isNaN(mid)) {
            ErrorWrapper.createError({
                name: 'mid is required, or is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'mid',
                    type: 'string',
                    value: mid,
                }),
                message: 'Error to get file',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.fileRepository.getFileById({ fid })

        const dimensions = calculateDimensions(result.file)
        const price = await calculatePrice(dimensions, mid)

        return res.status(200).send({
            status: 'success',
            message: 'file successfully found',
            data: {
                _id: result._id,
                filename: result.name,
                price,
                urlImage: result.url,
                dimensions,
                file: result.file,
            },
        })
    }

    getFileById = async (req, res) => {
        const { fid } = req.params
        if (!fid || !isNaN(fid)) {
            ErrorWrapper.createError({
                name: 'fid is required, or is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'fid',
                    type: 'string',
                    value: fid,
                }),
                message: 'Error to get file',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.fileRepository.getFileById({ fid })

        const dimensions = calculateDimensions(result.file)

        return res.status(200).send({
            status: 'success',
            message: 'file successfully found',
            data: {
                _id: result._id,
                filename: result.name,
                urlImage: result.url,
                dimensions,
                file: result.file,
            },
        })
    }

    downloadFileById = async (req, res) => {
        const { fid } = req.params
        if (!fid || !isNaN(fid)) {
            ErrorWrapper.createError({
                name: 'fid is required, or is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'fid',
                    type: 'string',
                    value: fid,
                }),
                message: 'Error to get file',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.fileRepository.getFileById({ fid })

        res.setHeader('Content-Type', 'application/octet-stream')
        res.setHeader('Content-Disposition', 'attachment; filename=' + result.name)

        return res.send(result.file)
    }

    searchFiles = async (req, res) => {
        const { limit, page, name } = req.query

        let query = {}
        if (name) query.name = name
        if (file) query.file = file
        if (url) query.url = url

        let result = await this.fileRepository.searchFiles({ limit, page, query })

        return res.status(200).send({
            status: 'success',
            message: 'all files',
            data: result,
        })
    }

    updateFile = async (req, res) => {
        const { name, file, url } = req.body
        const { fid } = req.params
        if (!fid || !isNaN(fid)) {
            ErrorWrapper.createError({
                name: 'fid is required, or is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'fid',
                    type: 'string',
                    value: fid,
                }),
                message: 'Error to update file',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        let query = { _id: fid }
        if (name) query.name = name
        if (file) query.file = file
        if (url) query.url = url

        const result = await this.fileRepository.updateFile({ query })

        return res.status(200).send({
            status: 'success',
            message: 'file successfully updated',
            data: result,
        })
    }

    deleteFile = async (req, res) => {
        const { fid } = req.params
        if (!fid || !isNaN(fid)) {
            ErrorWrapper.createError({
                name: 'fid is required, or is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'fid',
                    type: 'string',
                    value: fid,
                }),
                message: 'Error to delete file',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        await this.fileRepository.deleteFile({ cid })

        return res.status(204).send({})
    }
}
