import fileContainer from "../../Repository/fileDbContainer.js";

class MessagesDaoFile extends fileContainer{

    constructor(){
        super("Persistencia/files/messages.txt")
    }

    static getInstance(){

        if(!this.instance){
            this.instance = new MessagesDaoFile()
       } 
        
        return (this.instance)
    }
}

export default MessagesDaoFile