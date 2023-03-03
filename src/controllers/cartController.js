import services from '../services/cartServices.js'
let actualCart = []
let totalLength = []

class CartControllers{

    constructor() {

        this.servicesMethod = services
    }

    getCarts = async (req,res,next) => {
        try{
            actualCart = await this.servicesMethod.getActualCart(req,res,next)
            totalLength = await this.servicesMethod.getLengthCart(next)
        }catch(err){
            next(err)
        }
        actualCart.length !== 0 ? res.send(actualCart) : res.send([totalLength])
    }

    createCart = async(req,res,next) => {
        
        //let productReceived = req.body
        let result =[]
        try {
            result = await this.servicesMethod.saveCart(req,res,next)
        }catch(err){
            next(err)
        }
        res.json(result._id)
    }

    AddProductToCart = async(req,res,next) => {

        const { id } = req.params
        let product = req.body
        try {
            await this.servicesMethod.addItemCart(product,id,next)
        }catch(err) {
            next(err)
        }
        res.json({message: "ok"})
    }

    getCartPreview = (req,res) =>{
        
        let name = req.user.userName
        let email =  req.user.email
        let img =  req.user.img
        res.render("cart.ejs", {name, email, img})
    }

    getProductsCart = async (req,res,next) =>{

        const {id} = req.params;
        let products =[]
        try {
            products = await this.servicesMethod.getProductsAdded(id,next)
        }catch(error){
            next(err)
        }
        res.send(products)
    }

    deleteProductCart = async(req,res,next) => {
        try{
            this.servicesMethod.deleteItemCart(req,res,next)
        }catch(err){
            next(err)
        }
    }

    deleteCart = async (req,res,next) =>{
        try{
            await this.servicesMethod.deleteCart(req,res,next)
        }catch(error){
            next(err)
        }
    }

    finishCart = async(req, res, next) => {

        try {
            await this.servicesMethod.finishCart(req,res,next)
        }catch(error){
            next(err)
        }
        res.json({message : "Order ok"})
    }
}

let controllers = new CartControllers
export default controllers 