import { ErrorWrapper, codes, invalidFieldErrorInfo } from '../../../../middlewares/errors/index.js'
import { cityModel } from '../../models/index.js'

export class CityService {
    saveCity = async ({ city }) => {
        const newCities = new cityModel(city)
        await newCities.validate()

        return await newCities.save()
    }

    getCityById = async ({ cid }) => {
        const result = await cityModel.findById(cid)
        if (!result) {
            ErrorWrapper.createError({
                name: 'city not exists',
                cause: invalidFieldErrorInfo({
                    name: 'city',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to get city',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    searchCities = async ({ limit = 10, page = 1, query }) => {
        return await cityModel.paginate(query, { limit, page })
    }

    updateCity = async ({ city }) => {
        const result = await cityModel.findByIdAndUpdate(city._id, city, { new: true })
        if (!result) {
            ErrorWrapper.createError({
                name: 'city not exists',
                cause: invalidFieldErrorInfo({
                    name: 'city',
                    type: 'string',
                    value: result,
                }),
                message: 'Error to update city',
                code: codes.DATABASE_ERROR,
            })
        }

        return result
    }

    deleteCity = async ({ cid }) => {
        const city = await cityModel.findById(cid)
        if (!city) {
            ErrorWrapper.createError({
                name: 'city not exists',
                cause: invalidFieldErrorInfo({
                    name: 'city',
                    type: 'string',
                    value: city,
                }),
                message: 'Error to delete city',
                code: codes.DATABASE_ERROR,
            })
        }

        const result = await city.softDelete()

        return result
    }
}
