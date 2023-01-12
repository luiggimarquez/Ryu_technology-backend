import {Router} from 'express'
import compression from 'compression'
import { getInfo } from '../Controllers/info.js'

const routerInfo = Router()

routerInfo.get('/info', getInfo )

export default routerInfo