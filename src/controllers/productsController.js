import services from '../services/productsService.js'

class ProductControllers{

    constructor() {

        this.servicesMethod = services
    }

    getProducts = async(req, res,next) => {

        let result=[]
        try{
            result = await this.servicesMethod.getProducts(next)
        }catch(err){
            next(err)
        }
        res.send(result)
    }

    getProductById = async (req, res,next) =>{

        let result=[]
        try {
            result = await this.servicesMethod.getProduct(req,res,next)
        } catch (err) {
           next(err) 
        }
       res.send(result)
    }

    getRoot = (req, res) => {
        
        req.isAuthenticated() ? res.redirect("/productos") : res.redirect("/login")
    }

    postRoot = (req, res, next) => {
        try {
            this.servicesMethod.postRoot(req,res)  
        }catch(err){
            next(err)
        }
        res.redirect('/')
    }
    
    getPageProducts = (req,res) =>{
        
        let name = req.user.userName
        let email =  req.user.email
        let admin = req.user.isAdmin
        let img = req.user.img
        res.render("products.ejs", {name, email, admin, img})
    }

    modifyProduct = async (req,res, next) => {

        const { id } = req.params;
        const product = req.body;
        try {
            await this.servicesMethod.updateItems(product,id,next)
        } catch (err) {
            next(err)
        }
        
    }

    updateImage = async (req,res,next) =>{

        const id = req.body.idProduct
        try {
            this.servicesMethod.updateImageProduct(id)
        }catch(err){
            next(err)
        }
        res.redirect("/productos")
    }

    deleteProduct = async(req,res,next) => {

        const { id } = req.params;
        try{
            await this.servicesMethod.discardItem(id,next)
        }catch(err){
            next(err)
        }
    }

    getProductsbyCategory = async (req,res,next) =>{

        let products = []
        const { category } = req.params
        try {
            products = await this.servicesMethod.getProductsCategory(category)  
        } catch (err) {
           next(err) 
        }
        if(products !== ""){
            res.send(products)
        }else{
            try {
                await this.getProducts(req,res,next)
            } catch (err) {
                next(err)
            }
        }
    }
}

let controllers = new ProductControllers
export default controllers 