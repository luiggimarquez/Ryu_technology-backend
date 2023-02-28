import { Router } from 'express'
import { loginValidator } from "../middleware/loginValidate.js";
import controllers from '../controllers/chatsController.js'

const routerChat = Router()

class ChatsRouter{

    constructor(){

        this.controllersMethod = controllers
    }

    init(){

        routerChat.get('/SalaChat',loginValidator, this.controllersMethod.getChatRoom)
        routerChat.get('/',loginValidator, this.controllersMethod.getChats)
        routerChat.post('/',loginValidator, this.controllersMethod.saveChat)
        

        return routerChat
    }
}

let chatsRouter =  new ChatsRouter
export default chatsRouter