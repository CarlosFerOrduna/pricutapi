import citiesController from '../controllers/cities.controller.js'
import BaseRouter from './base.js'

class CitiesRouter extends BaseRouter {
    init() {
        this.get('/', ['public'], citiesController.searchCities)
        this.get('/:fid', ['public'], citiesController.getCityById)
        this.post('/', ['public'], citiesController.saveCity)
        this.put('/:fid', ['public'], citiesController.updateCity)
        this.delete('/:fid', ['public'], citiesController.deleteCity)
    }
}

const citieRouter = new CitiesRouter()

export default citieRouter
