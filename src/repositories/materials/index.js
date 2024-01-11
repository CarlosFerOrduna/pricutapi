import { materialDAO } from '../../dao/index.js'
import { CreateMaterial, SelectMaterial, UpdateMaterial } from '../../dao/dtos/index.js'

export class MaterialRepository {
    constructor() {
        this.dao = materialDAO
    }

    saveMaterial = async (material) => {
        const createMaterial = new CreateMaterial(material)
        const materialCreated = await this.dao.saveMaterial(createMaterial)

        return new SelectMaterial(materialCreated)
    }

    getMaterialById = async (mid) => {
        const material = await this.dao.getMaterialById(mid)

        return new SelectMaterial(material)
    }

    searchMaterials = async (limit, page, query) => {
        const {
            docs,
            totalPages,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        } = await this.dao.searchMaterials(limit, page, query)

        return {
            materials: docs.map((m) => new SelectMaterial(m)),
            totalPages,
            page,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        }
    }

    updateMaterial = async (material) => {
        const updateMaterial = new UpdateMaterial(material)
        const materialUpdated = await this.dao.updateMaterial(updateMaterial)

        return new SelectMaterial(materialUpdated)
    }

    deleteMaterial = async (aid) => {
        return await this.dao.deleteMaterial(aid)
    }
}
