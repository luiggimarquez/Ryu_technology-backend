import { logger } from "../utils/logger.js";
import { fork } from 'child_process'
import { arrayDto } from "../Persistencia/Repository/mongoDbContainer.js";

class infoServices{

    getInfo(res){

        logger.info("Request Received: Route: /info Method: GET")
        const childProcess = fork('./utils/info.js')
        childProcess.on('message', info =>{
            logger.info("Fin subproceso")
            res.render('info',{info, arrayDto})
        }) 
    }
}

const services = new infoServices
export default services