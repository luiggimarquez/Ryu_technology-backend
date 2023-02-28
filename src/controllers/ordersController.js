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

        console.log("grabando orden")
        let name = req.user.userName
        let email = req.user.email
        let result = await this.servicesMethod.saveAddress(req)
        //res.json({message : "OK"})
        console.log("result controller----------------------------------------------------: ",result)
        result= [result]
        console.log(typeof(result))
        res.render('finishedOrder.ejs',{name,email,result})
    }

    getOrders = async (req,res) =>{

        let result = await this.servicesMethod.getAllOrders(req,res)
        let name = req.user.userName
        let email = req.user.email
        console.log(result)
        res.render('orders.ejs', {name, email, result})
    }


}

let controllers = new OrdersControllers
export default controllers 