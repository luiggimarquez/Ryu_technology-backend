import {Router} from 'express'
import { getProductsTest, getRoot, postRoot } from '../Controllers/products.js'
import {loginUser} from '../middleware/loginUser.js'

const router = Router()

router.get("/api/productos-test", getProductsTest)
router.get("/", loginUser, getRoot)
router.post("/", postRoot)

export default router;