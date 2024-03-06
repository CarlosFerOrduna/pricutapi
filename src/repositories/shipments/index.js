import { CreateShipment, SelectShipment, UpdateShipment } from '../../dao/dtos/index.js'
import { shipmentsDAO } from '../../dao/index.js'

export class ShipmentRepository {
    constructor() {
        this.dao = shipmentsDAO
    }

    saveShipment = async ({ shipment }) => {
        const createShipment = new CreateShipment(shipment)
        const shipmentCreated = await this.dao.saveShipment({ shipment: createShipment })

        return new SelectShipment(shipmentCreated)
    }

    getShipmentById = async ({ sid }) => {
        const shipment = await this.dao.getShipmentById({ sid })

        return new SelectShipment(shipment)
    }

    searchShipments = async ({ limit, page, query }) => {
        const { docs, totalPages, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage } =
            await this.dao.searchShipments({ limit, page, query })

        return {
            shipments: docs.map((a) => new SelectShipment(a)),
            totalPages,
            page,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        }
    }

    updateShipment = async ({ shipment }) => {
        const updateShipment = new UpdateShipment(shipment)
        const shipmentUpdated = await this.dao.updateShipment({ shipment: updateShipment })

        return new SelectShipment(shipmentUpdated)
    }

    deleteShipment = async ({ sid }) => {
        return await this.dao.deleteShipment({ sid })
    }
}
