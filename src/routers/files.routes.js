import fileController from '../controllers/file.controller.js'
import BaseRouter from './base.routes.js'

class FileRouter extends BaseRouter {
    init() {
        this.get('/', ['public'], fileController.getFiles)
        this.get('/download/:fid', ['public'], fileController.downloadFileById)
        this.get('/:fid/:mid', ['public'], fileController.getFileById)
        this.post('/', ['public'], fileController.saveFile)
        this.put('/:fid', ['public'], fileController.updateFile)
        this.delete('/:fid', ['public'], fileController.deleteFile)
    }
}

const fileRouter = new FileRouter()

export default fileRouter
