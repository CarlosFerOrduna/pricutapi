import FileService from '../services/files.service.js'
import { calculateDimensions, calculatePrice } from '../../utils/dxfParser.util.js'
import { ConvertDxfToSvg } from '../../utils/dxfToSvg.util.js'
import { uploadImage } from '../../utils/uploadImage.util.js'

class FileController {
    constructor() {
        this.fileService = new FileService()
    }

    saveFile = async (req, res) => {
        try {
            const { originalname, buffer } = req.file
            if (!originalname) throw new Error('filename is not valid')
            if (!buffer) throw new Error('file is not valid')

            const svg = ConvertDxfToSvg(buffer)
            const urlImage = await uploadImage(svg)

            const result = await this.fileService.saveFile({
                name: originalname,
                file: buffer,
                url: urlImage
            })

            return res.status(201).json({
                status: 'success',
                message: 'file successfully created',
                data: {
                    _id: result._id,
                    name: result.name,
                    url: result.url,
                    dimensions: calculateDimensions(result.file),
                    file: result.file
                }
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    getFileByIdWithPrice = async (req, res) => {
        try {
            const { fid, mid } = req.params
            if (!fid || !isNaN(fid)) throw new Error('fid is required, or is not valid')
            if (!mid || !isNaN(mid)) throw new Error('pid is required, or is not valid')

            const result = await this.fileService.getFileById(fid)

            const dimensions = calculateDimensions(result.file)
            const price = await calculatePrice(dimensions, mid)

            return res.status(200).json({
                status: 'success',
                message: 'file successfully found',
                data: {
                    _id: result._id,
                    filename: result.name,
                    price,
                    urlImage: result.url,
                    dimensions,
                    file: result.file
                }
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    getFileById = async (req, res) => {
        try {
            const { fid } = req.params
            if (!fid || !isNaN(fid)) throw new Error('fid is required, or is not valid')

            const result = await this.fileService.getFileById(fid)

            const dimensions = calculateDimensions(result.file)

            return res.status(200).json({
                status: 'success',
                message: 'file successfully found',
                data: {
                    _id: result._id,
                    filename: result.name,
                    urlImage: result.url,
                    dimensions,
                    file: result.file
                }
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    downloadFileById = async (req, res) => {
        try {
            const { fid } = req.params
            if (!fid || !isNaN(fid)) throw new Error('fid is not valid')

            const result = await this.fileService.getFileById(fid)

            res.setHeader('Content-Type', 'application/octet-stream')
            res.setHeader('Content-Disposition', 'attachment; filename=' + result.name)

            return res.send(result.file)
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    searchFiles = async (req, res) => {
        try {
            const { limit, page, name } = req.query

            let query = {}
            if (name) query.name = name

            let result = await this.fileService.searchFiles(limit, page, query)

            return res.status(200).json({
                status: 'success',
                message: 'all files',
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

    updateFile = async (req, res) => {
        try {
            const { name, file, url } = req.body
            let newFile = {}

            if (name) newFile.name = name
            if (file) newFile.file = file
            if (url) newFile.url = url

            const result = await this.fileService.updateFile(newFile)

            return res.status(200).json({
                status: 'success',
                message: 'file successfully updated',
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

    deleteFile = async (req, res) => {
        try {
            const { cid } = req.params
            await this.fileService.deleteFile(cid)

            return res.status(204).json({})
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }
}

const fileController = new FileController()

export default fileController
