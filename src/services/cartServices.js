import cartsDaoMethods from '../Persistence/DAO/cart/cartsDaoMongoDb.js'

class CartServices {

     getActualCart = async(req, res,next) =>{
        
            return await cartsDaoMethods.getAll().then((products) =>{
                return products.filter(activeCart => (activeCart.active === true && req.user.email === activeCart.email))
            }).catch(err =>{
                next(err)
            })
    } 
    
    saveCart = async(req, res, next) =>{

        let result =[]
        try{
            result = await cartsDaoMethods.createCart(req.body, req.user.email)
        }catch(err){
            next(err)
        }
        return result
    } 

    getLengthCart = async(next) =>{

            return await cartsDaoMethods.getAll().then((products) => {
                return products.length
            }).catch(err =>{
                next(err)
            })
    }

    addItemCart = async(products,id,next) =>{

        try{
            return await cartsDaoMethods.addItemCart(products,id)
        }catch(err){
            next(err)
        }
    }

    getProductsAdded = async (id,next) => {

        return await cartsDaoMethods.getById(id).then( products =>{
            return products
        }).catch( err =>{
            next(err)
        })
    }

    deleteItemCart = async(req,res, next)=>{

        const {id, id_prod} = req.params
        try{
            await cartsDaoMethods.deleteItemCart(id,id_prod)
        }catch(err){
            next(err)
        }
    }

    deleteCart = async(req,res,next) =>{

        const{ id } = req.params;
        try{
            await cartsDaoMethods.deleteItem(id)
        }catch(err) {
            next(err)
        }
    }

    finishCart = async(req,res,next) =>{

        const {id} = req.params;
        try {
            return await cartsDaoMethods.finishCart(id)
        }catch(err) {
            next(err)
        }
    }
}

let services = new CartServices
export default services