import { CityController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class CityRouter extends BaseRouter {
    init() {
        this.cityController = new CityController()

        this.get('/', ['public'], this.cityController.searchCities)
        this.get('/:cid', ['public'], this.cityController.getCityById)
        this.post('/', ['admin'], this.cityController.saveCity)
        this.put('/:cid', ['admin'], this.cityController.updateCity)
        this.delete('/:cid', ['admin'], this.cityController.deleteCity)
    }
}
