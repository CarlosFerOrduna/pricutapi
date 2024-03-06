import {
    articleModel,
    categoryModel,
    cityModel,
    commentModel,
    cutServiceModel,
    fileModel,
    materialModel,
    productModel,
    shipmentServiceModel,
    shipmentModel,
    templateEmailModel,
    userModel,
} from '../dao/mongo/models/index.js'

export const migrateSchemaHandler = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const models = [
                articleModel,
                categoryModel,
                cityModel,
                commentModel,
                cutServiceModel,
                fileModel,
                materialModel,
                productModel,
                shipmentServiceModel,
                shipmentModel,
                templateEmailModel,
                userModel,
            ]

            for (const model of models) {
                const currentSchema = model.schema.obj
                const existingDocuments = await model.find({})

                for (const doc of existingDocuments) {
                    if (Object.keys(currentSchema).every((field) => Object.keys(doc._doc).includes(field))) continue

                    for (const key in doc._doc) {
                        if (!(key in currentSchema)) {
                            delete doc[key]
                        }
                    }

                    for (const key in currentSchema) {
                        if (!(key in doc._doc)) {
                            doc[key] = currentSchema[key].default ?? null
                        }
                    }

                    await doc.save()
                }
            }

            resolve()
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
}
