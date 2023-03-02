import chatsDaoMethods from '../Persistence/DAO/chat/chatsDaoMongoDb.js'
import { logger, loggerError } from '../../utils/log.js'


class OrdersServices {

    saveMessage = async (message) => {

        await chatsDaoMethods.saveMessage(message)
        return await chatsDaoMethods.getAll()
    }

    getMessages = async(next) =>{
        try{
         return await chatsDaoMethods.getAll()
        }catch(err){
            next(err)
        }
    }

    getMessagesEmail = async(req,res,next) =>{

        let result =[]
        try {

            result = await chatsDaoMethods.getAll()
            if(req.user.isAdmin){
                result =  result.filter(filter => filter.type === "sistema")
            }else{
                result = result.filter(filter => (filter.email === req.user.email && filter.type === "usuario" ))
            }
            return result

        } catch (error) {
            next(error)
        }
        return result
    }
}

let services = new OrdersServices
export default services