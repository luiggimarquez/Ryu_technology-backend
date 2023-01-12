import mongoDbContainer from "../../Containers/mongoDbContainer.js";
import { messagesModel } from "../../Models/MongoDbModel/messagesMongoDb.js";

class MessagesDaoMongoDb extends mongoDbContainer{

    constructor(){
        super(messagesModel)
    }

}

export default MessagesDaoMongoDb