import { FileController } from '../../../controllers/index.js'
import BaseRouter from '../../entities/base.js'

export class FileRouter extends BaseRouter {
    init() {
        this.fileController = new FileController()

        this.get('/', ['public'], this.fileController.searchFiles)
        this.get('/download/:fid', ['public'], this.fileController.downloadFileById)
        this.get('/:fid/:pid', ['public'], this.fileController.getFileByIdWithPrice)
        this.get('/:fid', ['public'], this.fileController.getFileById)
        this.post('/', ['admin'], this.fileController.saveFile)
        this.put('/:fid', ['admin'], this.fileController.updateFile)
        this.delete('/:fid', ['admin'], this.fileController.deleteFile)
    }
}
