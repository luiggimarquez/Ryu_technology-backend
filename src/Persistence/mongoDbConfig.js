import mongoose from "mongoose";
import config from '../../config.js'
import { logger, loggerError } from "../../utils/log.js";

(async function(){

    try {
        mongoose.connection.on('open',()=>{
            logger.info("Base de datos MongoDb conectada")
        })
        mongoose.connection.on("error", ()=>{
            logger.info(err)
            loggerError.error(err)
        })
        mongoose.set("strictQuery", false);
        const URL = config.MONGOSESSION
        let rta = await mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        
    } catch (error) {
        logger.info(error)
        loggerError.error(error) 
    }

})();