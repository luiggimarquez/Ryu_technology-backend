import {Router} from 'express'
import * as dotenv from 'dotenv'
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

    daoMethodProducts.getFaker().then((products) =>{

        let boolean = true;
        if(products.length === 0){ boolean = false;}
        res.render('partial', {products,boolean} )
    })
})

router.post("/",(req,res) =>{

    let received = req.body;
    daoMethodProducts.saveItems(received)
    res.redirect('/')
})

export default router;