import fileController from '../controllers/file.controller.js'
import BaseRouter from './base.routes.js'

class FileRouter extends BaseRouter {
    init() {
        this.get('/', ['public'], fileController.getFiles)
        this.get('/:fid', ['public'], fileController.getFileById)
        this.get('/download/:fid', ['public'], fileController.downloadFileById)
        this.post('/', ['public'], fileController.saveFile)
        this.put('/:fid', ['public'], fileController.updateFile)
        this.delete('/:fid', ['public'], fileController.deleteFile)
    }
}

const fileRouter = new FileRouter()

export default fileRouter
