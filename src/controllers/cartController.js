import services from '../services/cartServices.js'
let actualCart = []
let totalLength = []

class CartControllers{

    constructor() {

        this.servicesMethod = services
    }

    getCarts = async (req, res) => {

        actualCart = await this.servicesMethod.getActualCart(req,res)
        totalLength = await this.servicesMethod.getLengthCart()
        actualCart.length !== 0 ? res.send(actualCart) : res.send([totalLength])
    }

    createCart = async(req,res) => {

        let productReceived = req.body
        let result = await this.servicesMethod.saveCart(req,res)
        res.json(result._id)
    }

    AddProductToCart = (req,res) => {

        const { id } = req.params
        let product = req.body
        this.servicesMethod.addItemCart(product,id)
    }

    getCartPreview = (req,res) =>{
        
        let name = req.user.userName
        let email =  req.user.email
        res.render("cart", {name, email})
    }

    getProductsCart = async (req,res) =>{

        const {id} = req.params;
        let products = await this.servicesMethod.getProductsAdded(id)
        res.send(products)
    }

    deleteProductCart = (req,res) => {

        this.servicesMethod.deleteItemCart(req,res)
    }

    deleteCart = (req,res) =>{

        this.servicesMethod.deleteCart(req,res)
    }

    finishCart = (req, res) => {

        console.log("paso")

        this.servicesMethod.finishCart(req,res)
        res.json({message : "Order ok"})
    }
}

let controllers = new CartControllers
export default controllers 