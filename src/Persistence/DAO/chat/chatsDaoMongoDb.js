import MongoDbContainer from "../../Repository/mongoDbContainer.js";
import { chatsModel } from "../../models/chatsMongoModels.js" 

class chatsDaoMongoDb extends MongoDbContainer{

    constructor(){

        super(chatsModel)
    }

    saveMessage = async(message) =>{

        const chatSaveModel = new chatsModel(message)
        let result = await chatSaveModel.save()
        
    }   
}

let chatsDaoMethods = new chatsDaoMongoDb;
export default chatsDaoMethods;