import { logger, loggerError } from '../../utils/log.js'
import ordersDaoMethods from '../Persistence/DAO/orders/ordersDaoMongoDb.js'


class OrdersServices {

    
    saveOrder = async(req,res) =>{

        let order = req.body
        order = {...order,
            userName:req.user.userName, 
            userLastName:req.user.userLastName, 
            phone:req.user.phone,
            email:req.user.email
            }
        return await ordersDaoMethods.createOrder(order) 
    }

    saveAddress = async (req) =>{
        console.log("grabando direccion")

        let address =  req.body.address
        let id = req.body.id
        return await ordersDaoMethods.updateOrder(id, address)
        

    }
}

let services = new OrdersServices
export default services