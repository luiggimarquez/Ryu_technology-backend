import { logger } from '../../utils/log.js'


class productsService{

    getProductsTest(res){

        res.render("products")

        
    }

    /* getRoot(req){

        logger.info("Request Received: Route: / Method: GET")
        let name = req.user.userName
        let email = req.user.email

        const options = { root: './public/index/' , headers:{ 
            'Access-Control-Expose-Headers': 'name',
            'name': name, 'email': email }}
        
        return options
    }

    postRoot(req){

        logger.info("Request Received: Route: / Method: POST")
        let received = req.body;
        daoMethodProducts.saveItems(received)
    } */
}

let services = new productsService
export default services