import firebaseContainer from "../../Repository/firebaseDbContainer.js";

class MessagesDaoFirebase extends firebaseContainer{
    
    constructor(){
        super("messages")
    }

    static getInstance(){

        if(!this.instance){
            this.instance = new MessagesDaoFirebase()
       } 
        
        return (this.instance)
    }
}



export default MessagesDaoFirebase
