import { shippingDAO } from '../../dao/index.js'
import { CreateShipping, SelectShipping, UpdateShipping } from '../../dao/dtos/index.js'

export class ShippingRepository {
    constructor() {
        this.dao = shippingDAO
    }

    saveShipping = async ({ shipping }) => {
        const createShipping = new CreateShipping(shipping)
        const shippingCreated = await this.dao.saveShipping({ shipping: createShipping })

        return new SelectShipping(shippingCreated)
    }

    getShippingById = async ({ sid }) => {
        const shipping = await this.dao.getShippingById({ sid })

        return new SelectShipping(shipping)
    }

    searchShippings = async ({ limit, page, query }) => {
        const {
            docs,
            totalPages,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        } = await this.dao.searchShippings({ limit, page, query })

        return {
            shippings: docs.map((a) => new SelectShipping(a)),
            totalPages,
            page,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        }
    }

    updateShipping = async ({ shipping }) => {
        const updateShipping = new UpdateShipping(shipping)
        const shippingUpdated = await this.dao.updateShipping({ shipping: updateShipping })

        return new SelectShipping(shippingUpdated)
    }

    deleteShipping = async ({ sid }) => {
        return await this.dao.deleteShipping({ sid })
    }
}
