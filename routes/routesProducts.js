import {Router} from 'express'
import * as dotenv from 'dotenv'
import { logger } from '../utils/logger.js'
import {loginUser} from './middleware/loginUser.js'

dotenv.config()
let daoMethodProducts = []

switch(process.env.db){

    case "archivoDb":{

        let { default : ProductsDaoFile } = await import ('../Persistencia/DAOS/products/productsDaoFile.js')
        daoMethodProducts = new ProductsDaoFile;
        break;
    }
    case "mongoDb":{

        let { default : ProductsDaoMongoDb } = await import ('../Persistencia/Daos/products/productsDaoMongoDb.js')
        daoMethodProducts = new ProductsDaoMongoDb;
        break;
    }
    case "firebaseDb":{

        let { default : ProductsDaoFirebase } = await import ('../Persistencia/Daos/products/productsDaoFirebase.js')
        daoMethodProducts = new ProductsDaoFirebase
    }
}

const router = Router()

router.get("/api/productos-test", (req,res) =>{

    logger.info("Request Received: Route: /api/productos-test Method: GET")

    daoMethodProducts.getFaker().then((products) =>{

        let boolean = true;
        if(products.length === 0){ boolean = false;}
        res.render('partial', {products,boolean} )
    })
})

router.get("/", loginUser, (req,res)=>{
    
    logger.info("Request Received: Route: / Method: GET")
    let name = req.user.userName
    let email = req.user.email
    
    const options = { root: './public/index/' , headers:{ 
        'Access-Control-Expose-Headers': 'name',
        'name': name, 'email': email }}
    
    res.sendFile('index.html' , options)
    
})

router.post("/",(req,res) =>{

    logger.info("Request Received: Route: / Method: POST")
    let received = req.body;
    daoMethodProducts.saveItems(received)
    res.redirect('/')
})



export default router;