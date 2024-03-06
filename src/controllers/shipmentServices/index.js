import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { ShipmentServiceRepository } from '../../repositories/index.js'

export class ShipmentServiceController {
    constructor() {
        this.shipmentServiceRepository = new ShipmentServiceRepository()
    }

    saveShipmentService = async (req, res) => {
        const { name, standardPrice, standardWeight, pricePerKiloExtra, EstimatedDeliveryTime } = req.body
        if (!name) {
            ErrorWrapper.createError({
                name: 'name is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'name',
                    type: 'string',
                    value: name,
                }),
                message: 'Error to save shipmentService',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!standardPrice) {
            ErrorWrapper.createError({
                name: 'standardPrice is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'standardPrice',
                    type: 'number',
                    value: standardPrice,
                }),
                message: 'Error to save shipmentService',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!standardWeight) {
            ErrorWrapper.createError({
                name: 'standardWeight is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'standardWeight',
                    type: 'number',
                    value: standardWeight,
                }),
                message: 'Error to save shipmentService',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!pricePerKiloExtra) {
            ErrorWrapper.createError({
                name: 'pricePerKiloExtra is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'pricePerKiloExtra',
                    type: 'number',
                    value: pricePerKiloExtra,
                }),
                message: 'Error to save shipmentService',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!EstimatedDeliveryTime) {
            ErrorWrapper.createError({
                name: 'EstimatedDeliveryTime is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'EstimatedDeliveryTime',
                    type: 'string',
                    value: EstimatedDeliveryTime,
                }),
                message: 'Error to save shipmentService',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.shipmentServiceRepository.saveShipmentService({
            shipmentService: {
                name,
                standardPrice,
                standardWeight,
                pricePerKiloExtra,
                EstimatedDeliveryTime,
            },
        })

        return res.status(201).send({
            status: 'success',
            message: 'shipmentService successfully created',
            data: result,
        })
    }

    getShipmentServiceById = async (req, res) => {
        const { ssid } = req.params
        if (!ssid || !isNaN(ssid)) {
            ErrorWrapper.createError({
                name: 'ssid is required, or is not valid',
                cause: invalidFieldErrorInfo({ name: 'ssid', type: 'string', value: ssid }),
                message: 'Error to get shipmentService',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.shipmentServiceRepository.getShipmentServiceById({ ssid })

        return res.status(200).send({
            status: 'success',
            message: 'shipmentService successfully found',
            data: result,
        })
    }

    searchShipmentServices = async (req, res) => {
        const { name, standardPrice, standardWeight, pricePerKiloExtra, EstimatedDeliveryTime } = req.query

        let query = {}
        if (name) query.name = name
        if (standardPrice) query.standardPrice = standardPrice
        if (standardWeight) query.standardWeight = standardWeight
        if (pricePerKiloExtra) query.pricePerKiloExtra = pricePerKiloExtra
        if (EstimatedDeliveryTime) query.EstimatedDeliveryTime = EstimatedDeliveryTime

        const result = await this.shipmentServiceRepository.searchShipmentServices({ query })

        return res.status(200).send({
            status: 'success',
            message: 'all shipmentService',
            data: result,
        })
    }

    updateShipmentService = async (req, res) => {
        const { name, standardPrice, standardWeight, pricePerKiloExtra, EstimatedDeliveryTime } = req.query
        const { ssid } = req.params
        if (!ssid || !isNaN(ssid)) {
            ErrorWrapper.createError({
                name: 'ssid is required, or is not valid',
                cause: invalidFieldErrorInfo({ name: 'ssid', type: 'string', value: ssid }),
                message: 'Error to update shipmentService',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        let query = { _id: ssid }
        if (name) query.name = name
        if (standardPrice) query.standardPrice = standardPrice
        if (standardWeight) query.standardWeight = standardWeight
        if (pricePerKiloExtra) query.pricePerKiloExtra = pricePerKiloExtra
        if (EstimatedDeliveryTime) query.EstimatedDeliveryTime = EstimatedDeliveryTime

        const result = await this.shipmentServiceRepository.updateShipmentService({ shipmentService: query })

        return res.status(200).send({
            status: 'success',
            message: 'shipmentService successfully updated',
            data: result,
        })
    }

    deleteShipmentService = async (req, res) => {
        const { ssid } = req.params
        if (!ssid) {
            ErrorWrapper.createError({
                name: 'ssid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'ssid',
                    type: 'string',
                    value: ssid,
                }),
                message: 'Error to delete shipmentService',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        await this.shipmentServiceRepository.deleteShipmentService({ ssid })

        return res.status(204).send()
    }
}
