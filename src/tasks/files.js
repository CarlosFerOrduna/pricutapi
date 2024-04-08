import moment from 'moment'

import { fileModel } from '../dao/mongo/models/index.js'
import { deleteImages } from '../utils/uploadImage.util.js'
import { CronService } from './entities/cron/index.js'

export class TaskDeleteFiles {
    #extractPublicId(url) {
        if (url === 'fake') return

        const start = url.indexOf('upload/') + 7
        const end = url.lastIndexOf('.')
        return url.substring(start, end)
    }

    async cronClearFile() {
        try {
            CronService.createJob('0 0 0 * * 0', async () => {
                console.log('clear file: ' + moment().format('yyyy-MM-dd HH:mm:ss'))

                const result = await fileModel.find({
                    _id: { $ne: '65d3efbc2d42746870006b58' },
                    createdAt: { $lte: moment().add(7, 'days') },
                })

                console.log({ result: result.map((f) => f.id).join(', ') })

                const _ids = result.map((f) => f._id)
                const publicIds = result.map((f) => this.#extractPublicId(f.url))

                await Promise.all([fileModel.deleteMany({ _id: { $in: _ids } }), deleteImages({ publicIds })])
            })
        } catch (error) {
            console.error(error)
        }
    }
}
