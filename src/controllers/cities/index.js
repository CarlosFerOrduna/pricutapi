import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { CityRepository } from '../../repositories/index.js'

export class CitiesController {
    constructor() {
        this.citiesRepository = new CityRepository()
    }

    saveCity = async (req, res) => {
        const { key, value } = req.body
        if (!key || isNaN(key)) {
            ErrorWrapper.createError({
                name: 'key is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'key',
                    type: 'string',
                    value: key,
                }),
                message: 'Error to create category',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!value || !isNaN(value)) {
            ErrorWrapper.createError({
                name: 'value is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'value',
                    type: 'string',
                    value: value,
                }),
                message: 'Error to create category',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.citiesRepository.saveCity({ city: { key, value } })

        return res.status(201).send({
            status: 'success',
            message: 'cities successfully created',
            data: result,
        })
    }

    getCityById = async (req, res) => {
        const { cid } = req.params
        if (!cid || !isNaN(cid)) {
            ErrorWrapper.createError({
                name: 'cid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'cid',
                    type: 'string',
                    value: cid,
                }),
                message: 'Error to create category',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.citiesRepository.getCityById({ cid })

        return res.status(200).send({
            status: 'success',
            message: 'cities successfully found',
            data: result,
        })
    }

    searchCities = async (req, res) => {
        const { limit, page, key, value } = req.query

        let query = {}
        if (key) query.key = key
        if (value) query.value = value

        const result = await this.citiesRepository.searchCities({ limit, page, query })

        return res.status(200).send({
            status: 'success',
            message: 'all cities',
            data: result,
        })
    }

    updateCity = async (req, res) => {
        const { key, value } = req.body
        const { cid } = req.params
        if (!cid || !isNaN(cid)) {
            ErrorWrapper.createError({
                name: 'cid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'cid',
                    type: 'string',
                    value: cid,
                }),
                message: 'Error to create category',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        let query = { _id: cid }
        if (key) query.key = key
        if (value) query.value = value

        const result = await this.citiesRepository.updateCity({ query })

        return res.status(200).send({
            status: 'success',
            message: 'cities successfully updated',
            data: result,
        })
    }

    deleteCity = async (req, res) => {
        const { cid } = req.params
        if (!cid || !isNaN(cid)) {
            ErrorWrapper.createError({
                name: 'cid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'cid',
                    type: 'string',
                    value: cid,
                }),
                message: 'Error to create category',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        await this.citiesRepository.deleteCity({ cid })

        return res.status(204).send()
    }
}
