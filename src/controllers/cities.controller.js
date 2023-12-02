import CitiesService from '../services/cities.service.js'

class CitiesController {
    constructor() {
        this.citiesService = new CitiesService()
    }

    saveCity = async (req, res) => {
        try {
            const { key, value } = req.body
            if (!key || isNaN(key)) throw new Error('key is not valid')
            if (!value || !isNaN(value)) throw new Error('value is not valid')

            const result = await this.citiesService.saveCity({ key, value })

            return res.status(201).json({
                status: 'success',
                message: 'cities successfully created',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    getCityById = async (req, res) => {
        try {
            const { cid } = req.params
            if (!cid || !isNaN(cid)) throw new Error('cid is required, or is not valid')

            const result = await this.citiesService.getCityById(cid)

            return res.status(200).json({
                status: 'success',
                message: 'cities successfully found',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    searchCities = async (req, res) => {
        try {
            const result = await this.citiesService.searchCities()

            return res.status(200).json({
                status: 'success',
                message: 'all cities',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    updateCity = async (req, res) => {
        try {
            const { key, value } = req.body

            let newCities = {}
            if (key) newCities.key = key
            if (value) newCities.value = value

            const result = await this.citiesService.updateCity(newCities)

            return res.status(200).json({
                status: 'success',
                message: 'cities successfully updated',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }

    deleteCity = async (req, res) => {
        try {
            const { cid } = req.params
            await this.citiesService.deleteCity(cid)

            return res.status(204).json({})
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            })
        }
    }
}

const citiesController = new CitiesController()

export default citiesController
