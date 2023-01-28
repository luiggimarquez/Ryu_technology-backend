import services from "../Services/serviceInfo.js"

class InfoControllers{

    constructor(){

        this.servicesMethod = services
    }

    getInfo = (req,res) =>{

        this.servicesMethod.getInfo(res) 
    }
}

let controllers = new InfoControllers
export default controllers