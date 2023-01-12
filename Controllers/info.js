import services from "../Services/info.js"

const getInfo = (req,res) =>{

    services.getInfo(res) 
}

export {getInfo}