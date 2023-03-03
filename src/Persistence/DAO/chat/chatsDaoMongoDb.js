import MongoDbContainer from "../../Repository/mongoDbContainer.js";
import { chatsModel } from "../../models/chatsMongoModels.js" 
import { logger, loggerError } from "../../../../utils/log.js";

class chatsDaoMongoDb extends MongoDbContainer{

    constructor(){

        super(chatsModel)
    }

    saveMessage = async(message) =>{

        let result = []
        const chatSaveModel = new chatsModel(message)
        try {
            result = await chatSaveModel.save()
        } catch (error) {
            logger.error(error)
            loggerError.error(error) 
        } 
    }   
}

let chatsDaoMethods = new chatsDaoMongoDb;
export default chatsDaoMethods;