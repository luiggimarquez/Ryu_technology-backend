import firebaseContainer from "../../Containers/firebaseDbContainer.js";

class MessagesDaoFirebase extends firebaseContainer{
    
    constructor(){
        super("messages")
    }
}

export default MessagesDaoFirebase
