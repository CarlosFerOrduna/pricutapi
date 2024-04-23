import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { FileRepository } from '../../repositories/index.js'
import { calculateDimensions, calculatePrice, dxfParser } from '../../utils/dxfParser.util.js'
import { ConvertDxfToSvg } from '../../utils/dxfToSvg.util.js'
import { uploadImage } from '../../utils/uploadImage.util.js'
import { handlerError } from '../../utils/handlerError.util.js'

export class FileController {
    constructor() {
        this.fileRepository = new FileRepository()
    }

    saveFile = async (req, res) => {
        try {
            const {
                files: {
                    file: [{ originalname, buffer }],
                },
            } = req
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
            const urlImage = await uploadImage({ svgCode: svg })

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
                    dimensions: calculateDimensions({ buffer: result.file }),
                },
            })
        } catch (error) {
            handlerError(error, res)
        }
    }

    getFileByIdWithPrice = async (req, res) => {
        try {
            const { fid, pid } = req.params
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
            if (!pid || !isNaN(pid)) {
                ErrorWrapper.createError({
                    name: 'mid is required, or is not valid',
                    cause: invalidFieldErrorInfo({
                        name: 'mid',
                        type: 'string',
                        value: pid,
                    }),
                    message: 'Error to get file',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }

            const { _id, name, url, file } = await this.fileRepository.getFileById({ fid })

            const dimensions = calculateDimensions({ buffer: file })
            const price = await calculatePrice({ dimensions, pid })

            return res.status(200).send({
                status: 'success',
                message: 'file successfully found',
                data: {
                    _id: _id,
                    filename: name,
                    price: +price,
                    urlImage: url,
                    dimensions,
                },
            })
        } catch (error) {
            handlerError(error, res)
        }
    }

    getFileById = async (req, res) => {
        try {
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

            const dimensions = calculateDimensions({ buffer: result.file })

            return res.status(200).send({
                status: 'success',
                message: 'file successfully found',
                data: {
                    _id: result._id,
                    filename: result.name,
                    urlImage: result.url,
                    dimensions,
                },
            })
        } catch (error) {
            handlerError(error, res)
        }
    }

    downloadFileById = async (req, res) => {
        try {
            const { fid } = req.params
            if (!fid || !isNaN(fid)) {
                ErrorWrapper.createError({
                    name: 'fid is required, or is not valid',
                    cause: invalidFieldErrorInfo({
                        name: 'fid',
                        type: 'string',
                        value: fid,
                    }),
                    message: 'Error to download file',
                    code: codes.INVALID_TYPES_ERROR,
                })
            }

            const result = await this.fileRepository.getFileById({ fid })

            res.setHeader('Content-Type', 'application/octet-stream')
            res.setHeader('Content-Disposition', 'attachment; filename=' + result.name)

            return res.send(result.file)
        } catch (error) {
            handlerError(error, res)
        }
    }

    searchFiles = async (req, res) => {
        try {
            const { limit, page, name } = req.query

            let query = {}
            if (name) query.name = name

            let result = await this.fileRepository.searchFiles({ limit, page, query })

            return res.status(200).send({
                status: 'success',
                message: 'all files',
                data: result,
            })
        } catch (error) {
            handlerError(error, res)
        }
    }

    updateFile = async (req, res) => {
        try {
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

            const result = await this.fileRepository.updateFile({ file: query })

            return res.status(200).send({
                status: 'success',
                message: 'file successfully updated',
                data: result,
            })
        } catch (error) {
            handlerError(error, res)
        }
    }

    deleteFile = async (req, res) => {
        try {
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

            await this.fileRepository.deleteFile({ fid })

            return res.status(204).send({})
        } catch (error) {
            handlerError(error, res)
        }
    }
}
