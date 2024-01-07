import { MaterialRepository } from '../../repositories'

export class MaterialController {
    constructor() {
        this.materialRepository = new MaterialRepository()
    }

    saveMaterial = async (req, res) => {
        try {
            const { name, description, category, price, thickness, areaStandard } = req.body
            if (!name) throw new Error('name is not valid')
            if (!description) throw new Error('description is not valid')
            if (!category) throw new Error('category is not valid')
            if (!price) throw new Error('price is not valid')
            if (!thickness) throw new Error('thickness is not valid')

            const result = await this.materialRepository.saveMaterial({
                name,
                description,
                category,
                price,
                thickness,
                areaStandard
            })

            return res.status(201).json({
                status: 'success',
                message: 'material successfully created',
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

    getMaterialById = async (req, res) => {
        try {
            const { fid } = req.params
            if (!fid || !isNaN(fid)) throw new Error('fid is required, or is not valid')

            const result = await this.materialRepository.getMaterialById(fid)

            return res.status(200).json({
                status: 'success',
                message: 'material successfully found',
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

    searchMaterials = async (req, res) => {
        try {
            const {
                limit,
                page,
                name,
                description,
                category,
                price,
                thickness,
                areaStandard
            } = req.query

            let query = {}
            if (name) query.name = name
            if (description) query.description = description
            if (category) query.category = category
            if (price) query.price = price
            if (thickness) query.thickness = thickness
            if (areaStandard) query.areaStandard = areaStandard

            const result = await this.materialRepository.searchMaterials(limit, page, query)

            return res.status(200).json({
                status: 'success',
                message: 'all material',
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

    updateMaterial = async (req, res) => {
        try {
            const { name, description, category, price, thickness, areaStandard } = req.body
            let newMaterial = {}

            if (name) newMaterial.name = name
            if (description) newMaterial.description = description
            if (category) newMaterial.category = category
            if (price) newMaterial.price = price
            if (thickness) newMaterial.thickness = thickness
            if (areaStandard) newMaterial.areaStandard = areaStandard

            const result = await this.materialRepository.updateMaterial(newMaterial)

            return res.status(200).json({
                status: 'success',
                message: 'material successfully updated',
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

    deleteMaterial = async (req, res) => {
        try {
            const { mid } = req.params
            await this.materialRepository.deleteMaterial(mid)

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
