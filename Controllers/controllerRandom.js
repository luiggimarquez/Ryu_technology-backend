import services from '../Services/serviceRandom.js'

class RandomControllers{

    constructor(){

        this.servicesMethod  = services
    }

    random = (req,res)=>{
    
        const cant  = req.query
        this.servicesMethod.random(cant,res)
    } 
}

let controllers = new RandomControllers
export default controllers