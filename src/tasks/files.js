import moment from 'moment'
import cron from 'node-cron'

import { fileModel } from '../dao/mongo/models/index.js'
import { deleteImages } from '../utils/uploadImage.util.js'

const extractPublicId = (url) => {
    if (url === 'fake') return

    const start = url.indexOf('upload/') + 7
    const end = url.lastIndexOf('.')
    return url.substring(start, end)
}

const clearFiles = async () => {
    try {
        const result = await fileModel.find({
            _id: { $ne: '65d3efbc2d42746870006b58' },
            createdAt: { $lte: moment().add(7, 'days') },
        })

        const _ids = result.map((f) => f._id)
        const publicIds = result.map((f) => extractPublicId(f.url))

        await Promise.all(fileModel.deleteMany({ _id: { $in: _ids } }), deleteImages({ publicIds }))
    } catch (error) {
        console.error(error)
    }
}

export const cronClearFile = () => {
    cron.schedule(
        '0 2 * * *',
        async () => {
            console.log('clear file: ' + moment().format('yyyy-MM-dd HH:mm:ss'))
            try {
                await clearFiles()
                console.info('clear file: success')
            } catch (error) {
                console.error('clear file: ' + error)
            }
        },
        {
            timezone: 'America/New_York',
        },
    )
}
