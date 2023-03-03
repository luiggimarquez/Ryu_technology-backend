import { Router } from 'express'
import { loginValidator } from "../middleware/loginValidate.js";
import controllers from '../controllers/chatsController.js'

const routerChat = Router()

class ChatsRouter{

    constructor(){

        this.controllersMethod = controllers
    }

    init(){

        routerChat.get('/SalaChat', this.controllersMethod.getChatRoom)
        routerChat.get('/', this.controllersMethod.getChats)
        routerChat.get('/:email', this.controllersMethod.getChatsbyEmail)
        routerChat.post('/', this.controllersMethod.saveChat)
        return routerChat
    }
}

let chatsRouter =  new ChatsRouter
export default chatsRouter