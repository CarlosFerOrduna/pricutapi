import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { FileRepository, PurchaseOrderRepository, ShipmentRepository } from '../../repositories/index.js'
import { calculateDimensions, calculatePrice } from '../../utils/dxfParser.util.js'

export class PurchaseOrderController {
    constructor() {
        this.purchaseOrderRepository = new PurchaseOrderRepository()
        this.shipmentRepository = new ShipmentRepository()
        this.fileRepository = new FileRepository()
    }

    savePurchaseOrder = async (req, res) => {
        const { purchaserFullName, purchaserEmail, purchaserTel, additionalData } = req.body
        if (!purchaserEmail) {
            ErrorWrapper.createError({
                name: 'purchaserEmail is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'purchaserEmail',
                    type: 'string',
                    value: purchaserEmail,
                }),
                message: 'Error to save purchaseOrder',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        const { sid, fid, pid } = req.params

        const [shipment, file] = await Promise.all([
            this.shipmentRepository.getShipmentById(sid),
            this.fileRepository.getFileById(fid),
        ])
        const dimensions = calculateDimensions({ buffer: file.file })
        const productPrice = await calculatePrice({ dimensions, poid: pid })

        let purchaserDeliveryAddress = ''
        if (!!shipment?.city) purchaserDeliveryAddress += `, ${shipment.city}`
        if (!!shipment?.zipCode) purchaserDeliveryAddress += `, ${shipment.zipCode}`
        if (!!shipment?.streetName) purchaserDeliveryAddress += `, ${shipment.streetName}`
        if (!!shipment?.streetNumber) purchaserDeliveryAddress += `, ${shipment.streetNumber}`
        if (!!shipment?.floor) purchaserDeliveryAddress += `, ${shipment.floor}`
        if (!!shipment?.apartment) purchaserDeliveryAddress += `, ${shipment.apartment}`
        if (purchaserDeliveryAddress.startsWith(', ')) purchaserDeliveryAddress.replace(', ', '')
        if (!purchaserDeliveryAddress.startsWith('.')) purchaserDeliveryAddress += '.'

        const result = await this.purchaseOrderRepository.savePurchaseOrder({
            purchaseOrder: {
                purchaserFullName,
                purchaserDeliveryAddress,
                purchaserEmail,
                purchaserTel,
                additionalData: additionalData ?? '',
                productImageUrl: file.url,
                productDescription: file.name,
                productPrice,
                shipmentInformation: `${shipment.city}, ${shipment.streetName} ${shipment.streetNumber}`,
                shipmentPrice: shipment.price,
            },
        })

        return res.status(201).send({
            status: 'success',
            message: 'purchaseOrder successfully created',
            data: result,
        })
    }

    getPurchaseOrderById = async (req, res) => {
        const { poid } = req.params
        if (!poid) {
            ErrorWrapper.createError({
                name: 'poid is not valid',
                cause: invalidFieldErrorInfo({ name: 'poid', type: 'string', value: poid }),
                message: 'Error to get purchaseOrder',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.purchaseOrderRepository.getPurchaseOrderById({ poid })

        return res.status(200).send({
            status: 'success',
            message: 'purchaseOrder successfully found',
            data: result,
        })
    }

    searchPurchaseOrders = async (req, res) => {
        const {
            purchaserFullName,
            purchaserDeliveryAddress,
            purchaserEmail,
            purchaserTel,
            productDescription,
            productPrice,
            shipmentInformation,
            shipmentPrice,
            totalPrice,
            status,
        } = req.query

        let query = {}
        if (purchaserFullName) query.purchaserFullName = purchaserFullName
        if (purchaserDeliveryAddress) query.purchaserDeliveryAddress = purchaserDeliveryAddress
        if (purchaserEmail) query.purchaserEmail = purchaserEmail
        if (purchaserTel) query.purchaserTel = purchaserTel
        if (productDescription) query.productDescription = productDescription
        if (productPrice) query.productPrice = productPrice
        if (shipmentInformation) query.shipmentInformation = shipmentInformation
        if (shipmentPrice) query.shipmentPrice = shipmentPrice
        if (totalPrice) query.totalPrice = totalPrice
        if (status) query.status = status

        const result = await this.purchaseOrderRepository.searchPurchaseOrders({ query })

        return res.status(200).send({
            status: 'success',
            message: 'all purchaseOrder',
            data: result,
        })
    }

    updatePurchaseOrder = async (req, res) => {
        const {
            sellerCompanyName,
            sellerDeliveryAddress,
            sellerTax,
            sellerFiscalAddress,
            sellerEmail,
            sellerTel,
            purchaserFullName,
            purchaserDeliveryAddress,
            purchaserEmail,
            purchaserTel,
            additionalData,
            productImageUrl,
            productDescription,
            productPrice,
            shipmentInformation,
            shipmentPrice,
            totalPrice,
            status,
        } = req.query
        const { poid } = req.params
        if (!poid) {
            ErrorWrapper.createError({
                name: 'poid is required, or is not valid',
                cause: invalidFieldErrorInfo({ name: 'poid', type: 'string', value: poid }),
                message: 'Error to update purchaseOrder',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        let query = { _id: poid }
        if (sellerCompanyName) query.sellerCompanyName = sellerCompanyName
        if (sellerDeliveryAddress) query.sellerDeliveryAddress = sellerDeliveryAddress
        if (sellerTax) query.sellerTax = sellerTax
        if (sellerFiscalAddress) query.sellerFiscalAddress = sellerFiscalAddress
        if (sellerEmail) query.sellerEmail = sellerEmail
        if (sellerTel) query.sellerTel = sellerTel
        if (purchaserFullName) query.purchaserFullName = purchaserFullName
        if (purchaserDeliveryAddress) query.purchaserDeliveryAddress = purchaserDeliveryAddress
        if (purchaserEmail) query.purchaserEmail = purchaserEmail
        if (purchaserTel) query.purchaserTel = purchaserTel
        if (additionalData) query.additionalData = additionalData
        if (productImageUrl) query.productImageUrl = productImageUrl
        if (productDescription) query.productDescription = productDescription
        if (productPrice) query.productPrice = productPrice
        if (shipmentInformation) query.shipmentInformation = shipmentInformation
        if (shipmentPrice) query.shipmentPrice = shipmentPrice
        if (totalPrice) query.totalPrice = totalPrice
        if (status) query.status = status

        const result = await this.purchaseOrderRepository.updatePurchaseOrder({ purchaseOrder: query })

        return res.status(200).send({
            status: 'success',
            message: 'purchaseOrder successfully updated',
            data: result,
        })
    }

    deletePurchaseOrder = async (req, res) => {
        const { poid } = req.params
        if (!poid) {
            ErrorWrapper.createError({
                name: 'poid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'poid',
                    type: 'string',
                    value: poid,
                }),
                message: 'Error to delete purchaseOrder',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        await this.purchaseOrderRepository.deletePurchaseOrder({ poid })

        return res.status(204).send()
    }
}
