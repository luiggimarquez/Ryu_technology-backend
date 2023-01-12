import services from '../Services/random.js'

const random = (req,res)=>{
    
    const cant  = req.query
    services.random(cant,res)
}

export default random