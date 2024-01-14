import { cityDAO } from '../../dao/index.js'
import { CreateCity, SelectCity, UpdateCity } from '../../dao/dtos/index.js'

export class CityRepository {
    constructor() {
        this.dao = cityDAO
    }

    saveCity = async ({ city }) => {
        const createCity = new CreateCity(city)
        const cityCreated = await this.dao.saveCity({ createCity })

        return new SelectCity(cityCreated)
    }

    getCityById = async ({ cid }) => {
        const city = await this.dao.getCityById({ cid })

        return new SelectCity(city)
    }

    searchCities = async ({ limit, page, query }) => {
        const {
            docs,
            totalPages,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        } = await this.dao.searchCities({ limit, page, query })

        return {
            cities: docs.map((c) => new SelectCity(c)),
            totalPages,
            page,
            pagingCounter,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        }
    }

    updateCity = async ({ city }) => {
        const updateCity = new UpdateCity(city)
        const cityUpdated = await this.dao.updateCity({ updateCity })

        return new SelectCity(cityUpdated)
    }

    deleteCity = async ({ aid }) => {
        return await this.dao.deleteCity({ aid })
    }
}
