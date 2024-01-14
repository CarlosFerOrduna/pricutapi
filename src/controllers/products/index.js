import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../middlewares/errors/index.js'
import { ProductRepository } from '../../repositories/index.js'

export class ProductController {
    constructor() {
        this.productRepository = new ProductRepository()
    }

    saveProduct = async (req, res) => {
        const {
            material,
            code,
            pricePerPlank,
            priceSalePlank,
            width,
            height,
            thickness,
            area,
            volume,
            specificWeight,
            priceSquareCm,
            fiberLaser,
            CO2Laser,
            CNCRouter,
        } = req.body
        if (!material) {
            ErrorWrapper.createError({
                name: 'material is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'material',
                    type: 'string',
                    value: material,
                }),
                message: 'Error to save product',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!code) {
            ErrorWrapper.createError({
                name: 'code is not valid',
                cause: invalidFieldErrorInfo({ name: 'code', type: 'string', value: code }),
                message: 'Error to save product',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!pricePerPlank) {
            ErrorWrapper.createError({
                name: 'pricePerPlank is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'pricePerPlank',
                    type: 'string',
                    value: pricePerPlank,
                }),
                message: 'Error to save product',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!priceSalePlank) {
            ErrorWrapper.createError({
                name: 'priceSalePlank is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'priceSalePlank',
                    type: 'string',
                    value: priceSalePlank,
                }),
                message: 'Error to save product',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!width) {
            ErrorWrapper.createError({
                name: 'width is not valid',
                cause: invalidFieldErrorInfo({ name: 'width', type: 'string', value: width }),
                message: 'Error to save product',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!height) {
            ErrorWrapper.createError({
                name: 'height is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'height',
                    type: 'string',
                    value: height,
                }),
                message: 'Error to save product',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!thickness) {
            ErrorWrapper.createError({
                name: 'thickness is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'thickness',
                    type: 'string',
                    value: thickness,
                }),
                message: 'Error to save product',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!area) {
            ErrorWrapper.createError({
                name: 'area is not valid',
                cause: invalidFieldErrorInfo({ name: 'area', type: 'string', value: area }),
                message: 'Error to save product',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!volume) {
            ErrorWrapper.createError({
                name: 'volume is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'volume',
                    type: 'string',
                    value: volume,
                }),
                message: 'Error to save product',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!specificWeight) {
            ErrorWrapper.createError({
                name: 'specificWeight is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'specificWeight',
                    type: 'string',
                    value: specificWeight,
                }),
                message: 'Error to save product',
                code: codes.INVALID_TYPES_ERROR,
            })
        }
        if (!priceSquareCm) {
            ErrorWrapper.createError({
                name: 'priceSquareCm is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'priceSquareCm',
                    type: 'string',
                    value: priceSquareCm,
                }),
                message: 'Error to save product',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.productRepository.saveProduct({
            product: {
                material,
                code,
                pricePerPlank,
                priceSalePlank,
                width,
                height,
                thickness,
                area,
                volume,
                specificWeight,
                priceSquareCm,
                fiberLaser,
                CO2Laser,
                CNCRouter,
            },
        })

        return res.status(201).send({
            status: 'success',
            message: 'product successfully created',
            data: result,
        })
    }

    getProductById = async (req, res) => {
        const { pid } = req.params
        if (!pid || !isNaN(pid)) {
            ErrorWrapper.createError({
                name: 'pid is required, or is not valid',
                cause: invalidFieldErrorInfo({ name: 'pid', type: 'string', value: pid }),
                message: 'Error to get product',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        const result = await this.productRepository.getProductById({ pid })

        return res.status(200).send({
            status: 'success',
            message: 'product successfully found',
            data: result,
        })
    }

    searchProducts = async (req, res) => {
        const {
            material,
            code,
            pricePerPlank,
            priceSalePlank,
            width,
            height,
            thickness,
            area,
            volume,
            specificWeight,
            priceSquareCm,
            fiberLaser,
            CO2Laser,
            CNCRouter,
        } = req.query

        let query = {}
        if (material) query.material = material
        if (code) query.code = code
        if (pricePerPlank) query.pricePerPlank = pricePerPlank
        if (priceSalePlank) query.priceSalePlank = priceSalePlank
        if (width) query.width = width
        if (height) query.height = height
        if (thickness) query.thickness = thickness
        if (area) query.area = area
        if (volume) query.volume = volume
        if (specificWeight) query.specificWeight = specificWeight
        if (priceSquareCm) query.priceSquareCm = priceSquareCm
        if (fiberLaser) query.fiberLaser = fiberLaser
        if (CO2Laser) query.CO2Laser = CO2Laser
        if (CNCRouter) query.CNCRouter = CNCRouter

        const result = await this.productRepository.searchProducts({ limit, page, query })

        return res.status(200).send({
            status: 'success',
            message: 'all product',
            data: result,
        })
    }

    updateProduct = async (req, res) => {
        const {
            material,
            code,
            pricePerPlank,
            priceSalePlank,
            width,
            height,
            thickness,
            area,
            volume,
            specificWeight,
            priceSquareCm,
            fiberLaser,
            CO2Laser,
            CNCRouter,
        } = req.query
        const { pid } = req.params
        if (!pid || !isNaN(pid)) {
            ErrorWrapper.createError({
                name: 'pid is required, or is not valid',
                cause: invalidFieldErrorInfo({ name: 'pid', type: 'string', value: pid }),
                message: 'Error to update product',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        let query = { _id: pid }
        if (material) query.material = material
        if (code) query.code = code
        if (pricePerPlank) query.pricePerPlank = pricePerPlank
        if (priceSalePlank) query.priceSalePlank = priceSalePlank
        if (width) query.width = width
        if (height) query.height = height
        if (thickness) query.thickness = thickness
        if (area) query.area = area
        if (volume) query.volume = volume
        if (specificWeight) query.specificWeight = specificWeight
        if (priceSquareCm) query.priceSquareCm = priceSquareCm
        if (fiberLaser) query.fiberLaser = fiberLaser
        if (CO2Laser) query.CO2Laser = CO2Laser
        if (CNCRouter) query.CNCRouter = CNCRouter

        const result = await this.productRepository.updateProduct({ query })

        return res.status(200).send({
            status: 'success',
            message: 'product successfully updated',
            data: result,
        })
    }

    deleteProduct = async (req, res) => {
        const { pid } = req.params
        if (!pid) {
            ErrorWrapper.createError({
                name: 'pid is not valid',
                cause: invalidFieldErrorInfo({
                    name: 'pid',
                    type: 'string',
                    value: pid,
                }),
                message: 'Error to delete product',
                code: codes.INVALID_TYPES_ERROR,
            })
        }

        await this.productRepository.deleteProduct({ pid })

        return res.status(204).send()
    }
}
