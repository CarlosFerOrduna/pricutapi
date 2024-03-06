import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { CityRepository } from '../../repositories/index.js'

export class CityController {
    constructor() {
        this.citiesRepository = new CityRepository()
    }

    saveCity = async (req, res) => {
        const { name, shipmentService } = req.body
        if (!name || isNaN(name)) {
            ErrorWrapper.createError({
                name: 'name is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'name',
                    type: 'string',
                    value: name,
                }),
                message: 'Error to create city',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!shipmentService || !isNaN(shipmentService)) {
            ErrorWrapper.createError({
                name: 'shipmentService is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'shipmentService',
                    type: 'string',
                    value: shipmentService,
                }),
                message: 'Error to create city',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.citiesRepository.saveCity({ city: { name, shipmentService } })

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
                message: 'Error to get city',
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
        const { name, shipmentService } = req.query

        let query = {}
        if (name) query.name = name
        if (shipmentService) query.shipmentService = shipmentService

        const result = await this.citiesRepository.searchCities({ query })

        return res.status(200).send({
            status: 'success',
            message: 'all cities',
            data: result,
        })
    }

    updateCity = async (req, res) => {
        const { name, shipmentService } = req.body
        const { cid } = req.params
        if (!cid || !isNaN(cid)) {
            ErrorWrapper.createError({
                name: 'cid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'cid',
                    type: 'string',
                    value: cid,
                }),
                message: 'Error to update city',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        let query = { _id: cid }
        if (name) query.name = name
        if (shipmentService) query.shipmentService = shipmentService

        const result = await this.citiesRepository.updateCity({ city: query })

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
                message: 'Error to delete city',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        await this.citiesRepository.deleteCity({ cid })

        return res.status(204).send()
    }
}
