import { Model, Schema } from 'mongoose'

const materialSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ['sarasa'] },
    price: { type: Number, required: true }, // unidad de medida 30 mm x 30 mm
    espesor: { type: String, required: true }, // lo dejo en español, por que no entiendo bien de que se trata
    modulo: { type: String, default: 'modulo' } // lo mismo que el espesor
})

const materialModel = new Model('models', materialSchema)

export default materialModel
