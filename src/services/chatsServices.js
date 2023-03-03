import chatsDaoMethods from '../Persistence/DAO/chat/chatsDaoMongoDb.js'


class OrdersServices {

    saveMessage = async (message,next) => {

        try{
            await chatsDaoMethods.saveMessage(message)
            return await chatsDaoMethods.getAll()
        }catch(err){
            next(err)
        }
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
        try{
            result = await chatsDaoMethods.getAll()
            if(req.user.isAdmin){
                result =  result.filter(filter => filter.type === "sistema")
            }else{
                result = result.filter(filter => (filter.email === req.user.email && filter.type === "usuario" ))
            }
            return result

        }catch(err){
            next(err)
        }
        return result
    }
}

let services = new OrdersServices
export default services