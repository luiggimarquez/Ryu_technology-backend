import fileContainer from "../../Containers/fileDbContainer.js";

class MessagesDaoFile extends fileContainer{

    constructor(){
        super("Persistencia/files/messages.txt")
    }
}

export default MessagesDaoFile