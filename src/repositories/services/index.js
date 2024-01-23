import { serviceDAO } from '../../dao/index.js'
import { CreateService, SelectService, UpdateService } from '../../dao/dtos/index.js'

export class ServiceRepository {
    constructor() {
        this.dao = serviceDAO
    }

    saveService = async ({ service }) => {
        const createService = new CreateService(service)
        const serviceCreated = await this.dao.saveService({ service: createService })

        return new SelectService(serviceCreated)
    }

    getServiceById = async ({ sid }) => {
        const service = await this.dao.getServiceById({ sid })

        return new SelectService(service)
    }

    searchServices = async ({ query }) => {
        return await this.dao.searchServices({ query })
    }

    updateService = async ({ service }) => {
        const updateService = new UpdateService(service)
        const serviceUpdated = await this.dao.updateService({ service: updateService })

        return new SelectService(serviceUpdated)
    }

    deleteService = async ({ sid }) => {
        return await this.dao.deleteService({ sid })
    }
}