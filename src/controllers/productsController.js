import productsDaoMethods from '../Persistence/DAO/products/ProductsDaoMongoDb.js'
import services from '../services/productsService.js'

class ProductControllers{

    constructor() {

        this.servicesMethod = services
    }

    getProducts = (req, res) => {

        this.servicesMethod.getProducts(req,res)
    }

    getProductById = (req, res) =>{

        this.servicesMethod.getProduct(req,res)
    }

    getRoot = (req, res) => {
        
        req.isAuthenticated() ? res.redirect("/productos") : res.redirect("/login")
    }

    postRoot = (req, res) => {

        this.servicesMethod.postRoot(req,res)
        res.redirect('/')
    }
    
    getPageProducts = (req,res) =>{
        
        let name = req.user.userName
        let email =  req.user.email
        res.render("products", {name, email})        
    }

    modifyProduct = (req,res) => {

        const { id } = req.params;
        const product = req.body;
        productsDaoMethods.updateProducts(product,id)
    }

    updateImage = (req,res) =>{

        const id = req.body.idProduct
        console.log("img loaded: ", id)
        this.servicesMethod.updateImageProduct(id)
        res.redirect("/productos")
    }

    deleteProduct = (req,res) => {

        const { id } = req.params;
        productsDaoMethods.deleteItem(id)
    }
}

let controllers = new ProductControllers
export default controllers 