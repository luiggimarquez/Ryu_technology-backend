import { logger } from '../../utils/log.js'
import productsDaoMethods from '../Persistence/DAO/products/ProductsDaoMongoDb.js'


class productsService{

    getProducts(req, res){

        let name = req.user.userName
        let email =  req.user.email
        res.render("products", {name, email})
    }

    getProduct(req, res){

        const { id }= req.params
        console.log("id de busqueda: ", id)

        productsDaoMethods.getById(id).then((product) =>{

            //if(product !== ""){res.send(product)}else{res.send({ error : "producto no encontrado"}) }
            (product !== "") ? res.send(product) : res.send("NOT FOUND")
        })

    }

    /* getRoot(req){

        logger.info("Request Received: Route: / Method: GET")
        let name = req.user.userName
        let email = req.user.email

        const options = { root: './public/index/' , headers:{ 
            'Access-Control-Expose-Headers': 'name',
            'name': name, 'email': email }}
        
        return options
    }*/

    async postRoot(req){

        logger.info("Request Received: Route: / Method: POST")
        let received = req.body;
        let test ={
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            stock: req.body.stock
        }
        let received2 = await productsDaoMethods.saveProducts(test)
        let a = JSON.parse(JSON.stringify(received2.id))
        console.log(a)
        await productsDaoMethods.updateImg(a)
    } 
}

let services = new productsService
export default services