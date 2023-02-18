import { logger } from '../../utils/log.js'
import { promises as fs, rename } from 'fs';
import productsDaoMethods from '../Persistence/DAO/products/ProductsDaoMongoDb.js'


class productsService{

    getProducts(req, res){

        productsDaoMethods.getAll().then((products) =>{

            (products.length !== 0 ) && res.send(products)
        })
    }

    getProduct(req, res){

        const { id }= req.params
        console.log("id de busqueda: ", id)

        if(id !== ""){
            
            if(id.match(/^[0-9a-fA-F]{24}$/)){

                productsDaoMethods.getById(id).then((product) =>{
                    res.send(product)
                })
            }else{
                res.send({Error : "Producto no encontrado"})
            }
        }
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

    async updateImageProduct(id){
        
        let renameImg = ()=>{

            console.log('File deleted!');
                fs.rename('./public/images/products/temporal.jpg', `./public/images/products/${id}.jpg`, function (err) {
                    if (err) throw err;
                    console.log('File Renamed.');
            });
        } 

        fs.unlink(`./public/images/products/${id}.jpg`, renameImg());
    }
}

let services = new productsService
export default services