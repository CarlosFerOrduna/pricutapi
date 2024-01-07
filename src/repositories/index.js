import { Articles } from '../dao/index.js'
import ArticlesRepository from './articles/index.js'

export const articleRepository = new ArticlesRepository(new Articles())
