import mongoose from 'mongoose'

(async function (){

    try { 
        mongoose.connection.on("open", () =>{
            console.log("Base de datos MongoDb conectada")  
        })
        mongoose.connection.on("error", (err) =>{
            console.log(err)  
        })

        const URL = 'mongodb+srv://luiggimarquez:LuiggiMarquez@backendcordercourse.el27giy.mongodb.net/ecommerce?retryWrites=true&w=majority'
        let rta = await mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

    } catch (error){
        console.log(error)
    }
})();