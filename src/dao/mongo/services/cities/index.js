import { citiesModel } from '../../models/index.js'

export class CityService {
    saveCity = async (cities) => {
        const newCities = new citiesModel(cities)
        await newCities.validate()

        return await newCities.save()
    }

    getCityById = async (cid) => {
        const result = await citiesModel.findById(cid)
        if (!result) throw new Error('cities not exists')

        return result
    }

    searchCities = async (limit, page, query) => {
        return await citiesModel.paginate(query, { limit: limit ?? 25, page: page ?? 1 })
    }

    updateCity = async (city) => {
        const result = await citiesModel.findByIdAndUpdate(city._id, city)
        if (!result) throw new Error('cities not exists')

        return result
    }

    deleteCity = async (cid) => {
        const result = await citiesModel.findByIdAndDelete(cid)
        if (!result) throw new Error('cities not exists')

        return result
    }
}
