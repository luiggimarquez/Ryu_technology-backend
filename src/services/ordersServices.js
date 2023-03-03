import getTotalPayOrder from '../../utils/totalPay.js'
import ordersDaoMethods from '../Persistence/DAO/orders/ordersDaoMongoDb.js'
import config from '../../config.js'
import { sendEmailOrder } from '../../utils/email.js'

class OrdersServices {

    saveOrder = async(req,res,next) =>{

        let order = req.body
        let totalPay = getTotalPayOrder(order.products)
        order = {...order,
            userName:req.user.userName, 
            userLastName:req.user.userLastName, 
            phone:req.user.phone,
            email:req.user.email,
            totalPay: totalPay
            }
        try {
            return await ordersDaoMethods.createOrder(order)   
        }catch(err){
            next(err)
        }
    }

    saveAddress = async (req,res,next) =>{

        let result =[]
        let id = req.body.id
        let address =`${req.body.address}, ${req.body.city}, ${req.body.state}. Referencia: ${req.body.reference}`
        try {
            result = await ordersDaoMethods.updateOrder(id, address)
        }catch(err){
            next(err)
        }
        sendEmailOrder(config.ADMINMAIL,`RyuTech: Nueva Orden de Compra: ID - ${result._id} de ${result.email} `, [result] , 'Tenemos un compra en RyuTechnology');
        return result
    }

    getAllOrders = async(req,res) =>{

        let result=[]
        let totalOrders=[]
        try {
            totalOrders = await ordersDaoMethods.getAll()
        } catch (error) {
            next(err)
        }
        result = totalOrders.filter( filters => filters.email === req.user.email) 
        return result
    }
}

let services = new OrdersServices
export default services