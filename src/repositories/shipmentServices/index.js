import { CreateShipmentService, SelectShipmentService, UpdateShipmentService } from '../../dao/dtos/index.js'
import { shipmentServicesDAO } from '../../dao/index.js'

export class ShipmentServiceRepository {
    constructor() {
        this.dao = shipmentServicesDAO
    }

    saveShipmentService = async ({ shipmentService }) => {
        const createShipmentService = new CreateShipmentService(shipmentService)
        const shipmentServiceCreated = await this.dao.saveShipmentService({ shipmentService: createShipmentService })

        return new SelectShipmentService(shipmentServiceCreated)
    }

    getShipmentServiceById = async ({ ssid }) => {
        const shipmentService = await this.dao.getShipmentServiceById({ ssid })

        return new SelectShipmentService(shipmentService)
    }

    searchShipmentServices = async ({ query }) => {
        return await this.dao.searchShipmentServices({ query })
    }

    updateShipmentService = async ({ shipmentService }) => {
        const updateShipmentService = new UpdateShipmentService(shipmentService)
        const shipmentServiceUpdated = await this.dao.updateShipmentService({ shipmentService: updateShipmentService })

        return new SelectShipmentService(shipmentServiceUpdated)
    }

    deleteShipmentService = async ({ ssid }) => {
        return await this.dao.deleteShipmentService({ ssid })
    }
}
