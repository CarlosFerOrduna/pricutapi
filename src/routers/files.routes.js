import fileController from '../controllers/files.controller.js'
import BaseRouter from './base.js'

class FileRouter extends BaseRouter {
    init() {
        this.get('/', ['public'], fileController.searchFiles)
        this.get('/download/:fid', ['public'], fileController.downloadFileById)
        this.get('/:fid/:mid', ['public'], fileController.getFileByIdWithPrice)
        this.get('/:fid', ['public'], fileController.getFileById)
        this.post('/', ['public'], fileController.saveFile)
        this.put('/:fid', ['public'], fileController.updateFile)
        this.delete('/:fid', ['public'], fileController.deleteFile)
    }
}

const fileRouter = new FileRouter()

export default fileRouter
