import { Router } from 'express'
import sendEmail from '../utils/email.js'
import config from '../config.js'
import { twilioClient } from '../utils/twilio.js'
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

router.put('/:id', async(req,res)=>{

    const {id} = req.params;
   
    let content = JSON.parse(JSON.stringify(req.body))
    sendEmail(config.ADMINMAIL,`RyuTech: nuevo pedido de: ${req.user.userName} - ${req.user.email}`, content, `Tenemos una nueva orden ID: 000${id}`);
    
    await twilioClient.messages.create({
        body:`RyuTech: nuevo pedido de: ${req.user.userName} - ${req.user.email}, su pedido ha sido recibido y se encuentra en proceso - RyuTechnology`, 
        from:'whatsapp:+14155238886',
        to:`whatsapp:+${req.user.phone}`
    })
    daoMethods.finishCart(id)
})

export default router;