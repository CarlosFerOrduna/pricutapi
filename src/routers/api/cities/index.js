import { CitiesController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class CitiesRouter extends BaseRouter {
    init() {
        this.citiesController = new CitiesController()

        this.get('/', ['public'], this.citiesController.searchCities)
        this.get('/:fid', ['public'], this.citiesController.getCityById)
        this.post('/', ['public'], this.citiesController.saveCity)
        this.put('/:fid', ['public'], this.citiesController.updateCity)
        this.delete('/:fid', ['public'], this.citiesController.deleteCity)
    }
}
