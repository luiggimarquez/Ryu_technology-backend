import { logger } from '../utils/logger.js'
import { daoMethodProducts } from '../Persistencia/Daos/factory.js';

class productsService{

    getProductsTest(res){

        logger.info("Request Received: Route: /api/productos-test Method: GET")

        daoMethodProducts.getFaker().then((products) =>{
    
            let boolean = true;
            if(products.length === 0){ boolean = false;}
            res.render('partial', {products,boolean} )
        })
    }

    getRoot(req){

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
    }
}

let services = new productsService
export default services