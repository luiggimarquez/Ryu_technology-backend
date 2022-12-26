import { Router } from 'express'
const router = Router()
let daoMethods = []

switch(process.env.db){

    case "archivoDb":{
        let { default : CarritosDaoArchivo } = await import ('../Persistance/Daos/carritos/CarritosDaoArchivo.js')
        daoMethods = new CarritosDaoArchivo;
        break;
    }
    case "memoriaDb":{
        let { default : CarritosDaoMemoria} = await import ('../Persistance/Daos/carritos/CarritosDaoMemoria.js')
        daoMethods = new CarritosDaoMemoria;
        break;
    }
    case "firebaseDb":{
        let { default : CarritosDaoFirebase} = await import ('../Persistance/Daos/carritos/CarritosDaoFirebase.js')
        daoMethods = new CarritosDaoFirebase;
        break;
    }
    case "mongoDb":{
        let { default : CarritosDaoMongoDb} = await import ('../Persistance/Daos/carritos/CarritosDaoMongoDb.js')
        daoMethods = new CarritosDaoMongoDb;
        break;
    }
}

let actualCart = []

router.get('/', (req,res) => {

    daoMethods.getAll().then((products) =>{
        
        actualCart = products.filter(activeCart => (activeCart.active === true && req.user.email === activeCart.email))
        let totalLength = products.length
        console.log("total",totalLength)
        console.log("revision si esta actual", actualCart)
		actualCart.length !== 0 ? res.send(actualCart) : res.send([totalLength])
	})
})

router.post('/', (req,res) => {

    let productReceived = req.body;
    daoMethods.createCart(productReceived, req.user.email)
    res.send(productReceived.id)     
})

router.delete('/:id',(req,res) =>{

    const { id } = req.params
    daoMethods.deleteItem(id)
})

router.get('/:id/productos' ,(req,res) =>{

    const {id} = req.params;
    daoMethods.getById(id).then( products =>{
    
        res.send(products)
    })  
})

router.post('/:id/productos',(req,res) =>{

    const {id} = req.params;
    let products = req.body;
    daoMethods.addItemCar(products,id) 
})


router.delete('/:id/productos/:id_prod',(req,res) =>{

    const{ id, id_prod} = req.params;
    daoMethods.deleteItemCart(id,id_prod)
})

router.put('/:id', (req,res)=>{

    const {id} = req.params;
    daoMethods.finishCart(id)
})

export default router;