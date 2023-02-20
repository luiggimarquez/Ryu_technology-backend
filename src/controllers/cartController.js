import services from '../services/cartServices.js'
import cartsDaoMethods from '../Persistence/DAO/cart/cartsDaoMongoDb.js'
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

        /* cartsDaoMethods.getAll().then((products) =>{
        
            actualCart = products.filter(activeCart => (activeCart.active === true && req.user.email === activeCart.email))
            console.log(products)
            console.log(typeof(products))
            let totalLength = products.length
            console.log(totalLength)
            actualCart.length !== 0 ? res.send(actualCart) : res.send([totalLength])
        }) */
    }

    createCart = (req,res) => {

        let productReceived = req.body
        this.servicesMethod.saveCart(req,res)
        res.send(productReceived.id)
    }

    AddProductToCart = (req,res) => {

        const { id } = req.params
        let product = req.body
        console.log("id: ",id)
        console.log("producto: ",product)
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
        
        console.log(products)
        res.send(products)
    }

}


let controllers = new CartControllers
export default controllers 