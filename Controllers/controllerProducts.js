import services from '../Services/ServiceProducts.js'

class ProductControllers{

    constructor() {

        this.servicesMethod = services
    }

    getProductsTest = (req, res) => {

        this.servicesMethod.getProductsTest(res)
    }

    getRoot = (req, res) => {

        const options = this.servicesMethod.getRoot(req)
        res.sendFile('index.html', options)
    }

    postRoot = (req, res) => {

        this.servicesMethod.postRoot(req)
        res.redirect('/')
    }
     
}

let controllers = new ProductControllers
export default controllers 