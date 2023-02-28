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
    
   
}

let services = new OrdersServices
export default services