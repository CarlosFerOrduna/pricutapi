import { CreateCutService, SelectCutService, UpdateCutService } from '../../dao/dtos/index.js'
import { cutServiceDAO } from '../../dao/index.js'

export class CutServiceRepository {
    constructor() {
        this.dao = cutServiceDAO
    }

    saveCutService = async ({ cutService }) => {
        const createCutService = new CreateCutService(cutService)
        const cutServiceCreated = await this.dao.saveCutService({ cutService: createCutService })

        return new SelectCutService(cutServiceCreated)
    }

    getCutServiceById = async ({ csid }) => {
        const cutService = await this.dao.getCutServiceById({ csid })

        return new SelectCutService(cutService)
    }

    searchCutServices = async ({ query }) => {
        return await this.dao.searchCutServices({ query })
    }

    updateCutService = async ({ cutService }) => {
        const updateCutService = new UpdateCutService(cutService)
        const cutServiceUpdated = await this.dao.updateCutService({ cutService: updateCutService })

        return new SelectCutService(cutServiceUpdated)
    }

    deleteCutService = async ({ csid }) => {
        return await this.dao.deleteCutService({ csid })
    }
}
