import services from '../services/ordersServices.js'

class OrdersControllers{

    constructor() {

        this.servicesMethod = services
    }

    createOrderCart = async(req,res,next) =>{

        try{
            await this.servicesMethod.saveOrder(req, res, next)
        }catch(err){
           next(err) 
        }
        res.json({Message: "Save Order Ok"})   
    }

    getPreOrder = (req,res) =>{

        let name = req.user.userName
        let email = req.user.email
        res.render('preOrder.ejs',{name,email})
    }

    saveAddressOrder = async (req,res,next) =>{

        let result = []
        let name = req.user.userName
        let email = req.user.email
        let img = req.user.img
        try {
            result = await this.servicesMethod.saveAddress(req)
        } catch (err) {
            next(err)
        }
        result= [result]
        res.render('finishedOrder.ejs',{name,email,result,img})
    }

    getOrders = async (req,res,next) =>{

        let result=[]
        try {
            result = await this.servicesMethod.getAllOrders(req,res,next)
        } catch (err) {
            next(err) 
        }
        res.send(result)
    }
}

let controllers = new OrdersControllers
export default controllers 