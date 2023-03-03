import services from '../services/chatsServices.js'

class ChatsControllers{

    constructor() {

        this.servicesMethod = services
    }

    getChatRoom = (req, res) => {

        let name= req.user.userName
        let email= req.user.email
        let admin= req.user.isAdmin
        res.render('partial.handlebars',{name,email,admin})
    }

    getChats = async(req,res,next) =>{

        let user= req.user
        let result=[] 
        try{
            result= await this.servicesMethod.getMessages(next) 
        }catch(err){
            next(err)
        }
        res.send({user,result})
    }

    saveChat = async (req, res, next) =>{

        let message = req.body
        let result = []
        try {
            result = await this.servicesMethod.saveMessage(message,next)
        } catch (err) {
            next(err)
        }
         res.json(result)
    }

    getChatsbyEmail = async (req,res,next) =>{

        let result = []
        try{
            result = await this.servicesMethod.getMessagesEmail(req,res,next)
        }catch(err){
            next(err)   
        }
        res.send(result)
    }
}

let controllers = new ChatsControllers
export default controllers 