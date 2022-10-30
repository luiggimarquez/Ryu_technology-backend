import { Router } from 'express'
import admin from '../middleware/middleware.js'
import * as dotenv from 'dotenv'
dotenv.config()
const router = Router()
let daoMethods = []

switch(process.env.db){

    case "archivoDb":{
        let { default : ProductosDaoArchivo } = await import ('../Daos/productos/ProductosDaoArchivo.js')
        daoMethods = new ProductosDaoArchivo;
        break;
    }
    case "memoriaDb":{
        let { default : ProductosDaoMemoria} = await import ('../Daos/productos/ProductosDaoMemoria.js')
        daoMethods = new ProductosDaoMemoria;
        break;
    }
    case "firebaseDb":{
        let { default : ProductosDaoFirebase} = await import ('../Daos/productos/ProductosDaoFirebase.js')
        daoMethods = new ProductosDaoFirebase;
        break;
    }
    case "mongoDb":{
        let { default : ProductosDaoMongoDb} = await import ('../Daos/productos/ProductosDaoMongoDb.js')
        daoMethods = new ProductosDaoMongoDb;
        break;
    }
}

router.get('/', (req,res) => {
    
	daoMethods.getAll().then((products) =>{

		(products.length !== 0 ) && res.send(products)

	})
})

router.get('/:id', (req,res) => {

    const { id } = req.params;
	
	daoMethods.getById(id).then((product) =>{

		(product !== "") ? res.send(product) : res.send("producto no encontrado")
	})
})

router.post('/', admin, (req,res) =>{

    let productReceived = req.body;
    daoMethods.saveProducts(productReceived)
})

router.put('/:id', admin,(req,res) =>{

	const { id } = req.params;
	let productReceived = req.body;
	daoMethods.updateProducts({...productReceived,id})  
})

router.delete('/:id', admin, (req,res) =>{

    let productReceived = req.body;
	daoMethods.deleteItem(productReceived.id)
    
})

export default router;