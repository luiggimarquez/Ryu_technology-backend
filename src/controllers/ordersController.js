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
        res.render('preOrder',{name,email})
    }

    saveAddressOrder = async (req,res) =>{

        console.log("grabando orden")
        let name = req.user.userName
        let email = req.user.email
        let result = await this.servicesMethod.saveAddress(req)
        //res.json({message : "OK"})
        res.render('finishedOrder',{name,email,result})
    }


}

let controllers = new OrdersControllers
export default controllers 