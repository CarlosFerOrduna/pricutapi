import MaterialService from '../services/materials.service.js'

class MaterialController {
    constructor() {
        this.materialService = new MaterialService()
    }

    saveMaterial = async (req, res) => {
        try {
            const { name, description, category, price, thickness, areaStandard } = req.body
            if (!name) throw new Error('name is not valid')
            if (!description) throw new Error('description is not valid')
            if (!category) throw new Error('category is not valid')
            if (!price) throw new Error('price is not valid')
            if (!thickness) throw new Error('thickness is not valid')

            const result = await this.materialService.saveMaterial({
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

            const result = await this.materialService.getMaterialById(fid)

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

    getMaterials = async (req, res) => {
        try {
            const result = await this.materialService.getMaterials()

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

            const result = await this.materialService.updateMaterial(newMaterial)

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
            await this.materialService.deleteMaterial(mid)

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

const materialController = new MaterialController()

export default materialController
