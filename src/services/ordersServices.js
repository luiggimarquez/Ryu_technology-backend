import { logger, loggerError } from '../../utils/log.js'
import getTotalPayOrder from '../../utils/totalPay.js'
import ordersDaoMethods from '../Persistence/DAO/orders/ordersDaoMongoDb.js'
import config from '../../config.js'
import { sendEmailOrder } from '../../utils/email.js'



class OrdersServices {

    
    saveOrder = async(req,res) =>{

        let order = req.body
        let totalPay = getTotalPayOrder(order.products)
        order = {...order,
            userName:req.user.userName, 
            userLastName:req.user.userLastName, 
            phone:req.user.phone,
            email:req.user.email,
            totalPay: totalPay
            }
        return await ordersDaoMethods.createOrder(order) 
    }

    saveAddress = async (req) =>{

        let id = req.body.id
        let address =`${req.body.address}, ${req.body.city}, ${req.body.state}. Referencia: ${req.body.reference}`
        let result = await ordersDaoMethods.updateOrder(id, address)
        sendEmailOrder(config.ADMINMAIL,`RyuTech: Nueva Orden de Compra: ID - ${result._id} de ${result.email} `, [result] , 'Tenemos un compra en RyuTechnology');
        return result
    }

    getAllOrders = async(req,res) =>{

        let totalOrders = await ordersDaoMethods.getAll()
        let result = totalOrders.filter( filters => filters.email === req.user.email) 
        return result
    }
}

let services = new OrdersServices
export default services