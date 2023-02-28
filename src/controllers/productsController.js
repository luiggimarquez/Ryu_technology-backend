import productsDaoMethods from '../Persistence/DAO/products/ProductsDaoMongoDb.js'
import services from '../services/productsService.js'

class ProductControllers{

    constructor() {

        this.servicesMethod = services
    }

    getProducts = async(req, res) => {

        let result = await this.servicesMethod.getProducts(req,res)
        res.send(result)
    }

    getProductById = async (req, res) =>{

       let result = await this.servicesMethod.getProduct(req,res)
       res.send(result)
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
        res.render("products.ejs", {name, email})
    }

    modifyProduct = (req,res) => {

        const { id } = req.params;
        const product = req.body;
        productsDaoMethods.updateProducts(product,id)
    }

    updateImage = (req,res) =>{

        const id = req.body.idProduct
        this.servicesMethod.updateImageProduct(id)
        res.redirect("/productos")
    }

    deleteProduct = (req,res) => {

        const { id } = req.params;
        productsDaoMethods.deleteItem(id)
    }

    getProductsbyCategory = async (req,res) =>{

        const { category } = req.params
        let products = await this.servicesMethod.getProductsCategory(category)
        if(products !== ""){res.send(products)}else{this.getProducts(req,res)}
        //res.send(products)
    }
}

let controllers = new ProductControllers
export default controllers 