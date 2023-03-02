import services from '../services/ordersServices.js'



class OrdersControllers{

    constructor() {

        this.servicesMethod = services
    }

    createOrderCart = (req,res) =>{

        this.servicesMethod.saveOrder(req, res)
        res.json({Message: "Save Order Ok"})
        
    }

    getPreOrder = (req,res) =>{

        let name = req.user.userName
        let email = req.user.email
        res.render('preOrder.ejs',{name,email})
    }

    saveAddressOrder = async (req,res) =>{

        let name = req.user.userName
        let email = req.user.email
        let img = req.user.img
        let result = await this.servicesMethod.saveAddress(req)
        result= [result]
        res.render('finishedOrder.ejs',{name,email,result,img})
    }

    getOrders = async (req,res) =>{

        let result = await this.servicesMethod.getAllOrders(req,res)
        let name = req.user.userName
        let email = req.user.email
        res.send(result)
    }


}

let controllers = new OrdersControllers
export default controllers 