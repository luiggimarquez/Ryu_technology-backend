import { logger } from '../../utils/log.js'
import { promises as fs, rename } from 'fs';
import productsDaoMethods from '../Persistence/DAO/products/ProductsDaoMongoDb.js'


class productsService{

    getProducts = async (next)=>{
        let result=[]
        return productsDaoMethods.getAll().then((products) =>{
            (products.length !== 0) && (result=products)
            return result
        }).catch((err)=>{
            next(err)
        })
    }

    getProduct = async(req, res, next)=>{

        const { id }= req.params

        if(id !== ""){
            
            if(id.match(/^[0-9a-fA-F]{24}$/)){

                return productsDaoMethods.getById(id).then((product) =>{
                    return product
                }).catch(err =>{
                    next(err)
                })
            }else{
                return {Error : "Producto no encontrado"}
            }
        }
    }

    postRoot = async(req,res,next)=>{

        logger.info("Request Received: Route: / Method: POST")
        let product ={
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            stock: req.body.stock
        }
        try {
            let received = await productsDaoMethods.saveProducts(product)
            let imagen = JSON.parse(JSON.stringify(received.id))
            await productsDaoMethods.updateImg(imagen)
        }catch(err){
            next(err) 
        }
    } 

    updateItems = async(product,id,next)=>{

        try {
            await productsDaoMethods.updateProducts(product,id)  
        }catch(error){
            next(err) 
        }
    }

    updateImageProduct = async (id) => {
        
        let renameImg = ()=>{

            console.log('File deleted!');
                fs.rename('./public/images/products/temporal.jpg', `./public/images/products/${id}.jpg`, function (err) {
                    if (err) throw err;
                    console.log('File Renamed.');
            });
        } 

        fs.unlink(`./public/images/products/${id}.jpg`, renameImg());
    }

    discardItem = async(id,next)=>{

        try {
            await productsDaoMethods.deleteItem(id)
        }catch(err){
            next(err)
        }
    }

     getProductsCategory = async (category,next) =>{

        if(category !== "0"){
            return productsDaoMethods.getByCategory(category).then((products)=>{
                return products
            }).catch((err)=>{
                next(err)
            })
        }else{

            return ""
        }
    }
}

let services = new productsService
export default services