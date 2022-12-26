import mongoose from 'mongoose'
import config from '../../config.js';
import { logger, loggerError} from '../../utils/logger.js'

(async function (){

    try { 
        mongoose.connection.on("open", () =>{
            logger.info("Base de datos MongoDb conectada")  
        })
        mongoose.connection.on("error", (err) =>{
            logger.info(err)
            loggerError.error(err)  
        })

        const URL = config.MONGOSESSION
        let rta = await mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

    } catch (error){
        logger.info(error)
        loggerError.error(error)
    }
})();