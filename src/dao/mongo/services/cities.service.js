import citiesModel from '../models/cities.model.js'

export default class CitiesService {
    saveCity = async (cities) => {
        try {
            const newCities = new citiesModel(cities)
            await newCities.validate()

            return await newCities.save()
        } catch (error) {
            throw new Error('citiesService: ' + error)
        }
    }

    getCityById = async (cid) => {
        try {
            const result = await citiesModel.findById(cid)
            if (!result) throw new Error('cities not exists')

            return result
        } catch (error) {
            throw new Error('getCitiesById: ' + error)
        }
    }

    searchCities = async () => {
        try {
            return await citiesModel.find({})
        } catch (error) {
            throw new Error('searchCities: ' + error)
        }
    }

    updateCity = async (city) => {
        try {
            const result = await citiesModel.findByIdAndUpdate(city._id, city)
            if (!result) throw new Error('cities not exists')

            return result
        } catch (error) {
            throw new Error('updatecities: ' + error)
        }
    }

    deleteCity = async (cid) => {
        try {
            const result = await citiesModel.findByIdAndDelete(cid)
            if (!result) throw new Error('cities not exists')

            return result
        } catch (error) {
            throw new Error('deletecities: ' + error)
        }
    }
}
