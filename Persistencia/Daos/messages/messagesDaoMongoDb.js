import mongoDbContainer from "../../Repository/mongoDbContainer.js";
import { messagesModel } from "../../Models/MongoDbModel/messagesMongoDb.js";


class MessagesDaoMongoDb extends mongoDbContainer{

    static instance;

    constructor(){
        super(messagesModel)
    }

   
    static getInstance(){

        if(!this.instance){
            this.instance = new MessagesDaoMongoDb()
       } 
        
        return (this.instance)
    }
}

export default MessagesDaoMongoDb