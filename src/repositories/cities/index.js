import { CreateCity, SelectCity, UpdateCity } from '../../dao/dtos/index.js'
import { cityDAO } from '../../dao/index.js'

export class CityRepository {
    constructor() {
        this.dao = cityDAO
    }

    saveCity = async ({ city }) => {
        const createCity = new CreateCity(city)
        const cityCreated = await this.dao.saveCity({ city: createCity })

        return new SelectCity(cityCreated)
    }

    getCityById = async ({ cid }) => {
        const city = await this.dao.getCityById({ cid })

        return new SelectCity(city)
    }

    searchCities = async ({ query }) => {
        return await this.dao.searchCities({ query })
    }

    updateCity = async ({ city }) => {
        const updateCity = new UpdateCity(city)
        const cityUpdated = await this.dao.updateCity({ city: updateCity })

        return new SelectCity(cityUpdated)
    }

    deleteCity = async ({ cid }) => {
        return await this.dao.deleteCity({ cid })
    }
}
