import mongoose from 'mongoose'
import config from '../config.js';

(async function (){

    try { 
        mongoose.connection.on("open", () =>{
            console.log("Base de datos MongoDb conectada")  
        })
        mongoose.connection.on("error", (err) =>{
            console.log(err)  
        })

        const URL = config.MONGOSESSION
        let rta = await mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

    } catch (error){
        console.log(error)
    }
})();