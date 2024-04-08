import { launch } from 'puppeteer'
import citiesModel from '../dao/mongo/models/cities/index.js'

const getPriceShipping = async ({
    cityOrigin,
    cityDestination,
    weight,
    long,
    high,
    width,
    insurance = 0, //todo: seteo 0 por que no funciona en 1
    collection = 'no', //todo: seteo "no" por que no esta funcionando para todo el pais
    typeMarketing = 1 //todo: seteo 1 por que  funciona con el valor 2
}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await launch({ headless: 'new', slowMo: 250 })
            const page = await browser.newPage()

            await page.goto(process.env.URL_QUOTE)

            await page.evaluate(() => {
                document.getElementById('ciudadOrigen').value = cityOrigin
                document.getElementById('ciudadDestino').value = cityDestination
                document.getElementById('seguro').value = insurance
                document.getElementById('tipoMercancia').value = typeMarketing
                document.getElementById('recoleccion').value = collection
                document.getElementById('Peso').value = weight
                document.getElementById('Largo').value = long
                document.getElementById('Alto').value = high
                document.getElementById('Ancho').value = width
                $('[onclick="Cotizar()"]').click()
            })

            await page.waitForFunction(() => document.querySelector('#_totalPagar') !== null)

            const result = await page.evaluate(
                () => document.querySelector('#_totalPagar').value
            )

            await browser.close()

            resolve(result)
        } catch (error) {
            reject(Error('priceShipping: ' + error))
        }
    })
}

export const createShipping = async ({ dimensions, _idCityOrigin, _idCityDestination }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cityOrigin = await citiesModel.findById(_idCityOrigin)
            const cityDestination = await citiesModel.findById(_idCityDestination)
            const weight = ''
            const long = ''
            const high = ''
            const width = ''

            const price = await getPriceShipping({
                cityOrigin: cityOrigin.key,
                cityDestination: cityDestination.key
            })

            resolve({
                cityOrigin: cityOrigin._id,
                cityDestination: cityDestination._id,
                weight,
                long,
                high,
                width,
                price
            })
        } catch (error) {
            reject(Error('createShipping: ' + error))
        }
    })
}
