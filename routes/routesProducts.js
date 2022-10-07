import {Router} from 'express'
import '../db/models/productsModel.js'
import '../db/models/chatsModel.js'
import { containerProducts } from '../db/db.js'

const router = Router()

router.get("/", (req,res) =>{

    res.sendFile('index.html' ,{ root: './public' } )
})

router.post("/",(req,res) =>{

    let received = req.body;
    containerProducts.saveProducts(received)
    res.redirect('/')
})

export default router;