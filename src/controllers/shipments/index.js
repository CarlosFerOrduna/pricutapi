import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { CityRepository, FileRepository, ProductRepository, ShipmentRepository } from '../../repositories/index.js'
import { calculateDimensions } from '../../utils/dxfParser.util.js'

export class ShipmentController {
    constructor() {
        this.shipmentRepository = new ShipmentRepository()
        this.cityRepository = new CityRepository()
        this.fileRepository = new FileRepository()
        this.productRepository = new ProductRepository()
    }

    saveShipment = async (req, res) => {
        const { quantity, streetName, streetNumber, floor, apartment, zipCode } = req.body
        const { cid, fid, pid } = req.params

        const [city, file, product] = await Promise.all([
            this.cityRepository.getCityById(cid),
            this.fileRepository.getFileById(fid),
            this.productRepository.getProductById(pid),
        ])

        const { width, high } = calculateDimensions({ buffer: file.file })
        const long = product.thickness * quantity
        const volume = width * high * long
        const weight = product.specificWeight * volume
        const exedentWeight = Math.max(0, Math.ceil(weight - product.standardWeight))
        const price = city.shipmentService.price + exedentWeight * city.pricePerKiloExtra

        const result = await this.shipmentRepository.saveShipment({
            shipment: {
                city: city.name,
                shipmentService: city.shipmentService.name,
                streetName,
                streetNumber,
                floor,
                apartment,
                zipCode,
                weight,
                long,
                high,
                width,
                price,
            },
        })

        return res.status(201).send({
            status: 'success',
            message: 'shipment successfully created',
            data: result,
        })
    }

    getShipmentById = async (req, res) => {
        const { sid } = req.params
        if (!sid || !isNaN(sid)) {
            ErrorWrapper.createError({
                name: 'sid is required, or is not valid',
                cause: invalidFieldErrorInfo({ name: 'sid', type: 'string', value: sid }),
                message: 'Error to get shipment',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.shipmentRepository.getShipmentById({ sid })

        return res.status(200).send({
            status: 'success',
            message: 'shipment successfully found',
            data: result,
        })
    }

    searchShipments = async (req, res) => {
        const {
            city,
            shipmentService,
            streetName,
            streetNumber,
            floor,
            apartment,
            zipCode,
            weight,
            long,
            high,
            width,
            price,
        } = req.query

        let query = {}
        if (city) query.city = city
        if (shipmentService) query.shipmentService = shipmentService
        if (streetName) query.streetName = streetName
        if (streetNumber) query.streetNumber = streetNumber
        if (floor) query.floor = floor
        if (apartment) query.apartment = apartment
        if (zipCode) query.zipCode = zipCode
        if (weight) query.weight = weight
        if (long) query.long = long
        if (high) query.high = high
        if (width) query.width = width
        if (price) query.price = price

        const result = await this.shipmentRepository.searchShipments({ query })

        return res.status(200).send({
            status: 'success',
            message: 'all shipment',
            data: result,
        })
    }

    updateShipment = async (req, res) => {
        const {
            city,
            shipmentService,
            streetName,
            streetNumber,
            floor,
            apartment,
            zipCode,
            weight,
            long,
            high,
            width,
            price,
        } = req.query

        const { sid } = req.params
        if (!sid || !isNaN(sid)) {
            ErrorWrapper.createError({
                name: 'sid is required, or is not valid',
                cause: invalidFieldErrorInfo({ name: 'sid', type: 'string', value: sid }),
                message: 'Error to update shipment',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        let query = {}
        if (city) query.city = city
        if (shipmentService) query.shipmentService = shipmentService
        if (streetName) query.streetName = streetName
        if (streetNumber) query.streetNumber = streetNumber
        if (floor) query.floor = floor
        if (apartment) query.apartment = apartment
        if (zipCode) query.zipCode = zipCode
        if (weight) query.weight = weight
        if (long) query.long = long
        if (high) query.high = high
        if (width) query.width = width
        if (price) query.price = price

        const result = await this.shipmentRepository.updateShipment({ query })

        return res.status(200).send({
            status: 'success',
            message: 'shipment successfully updated',
            data: result,
        })
    }

    deleteShipment = async (req, res) => {
        const { sid } = req.params
        if (!sid) {
            ErrorWrapper.createError({
                name: 'sid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'sid',
                    type: 'string',
                    value: sid,
                }),
                message: 'Error to delete shipment',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        await this.shipmentRepository.deleteShipment({ sid })

        return res.status(204).send()
    }
}
