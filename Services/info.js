import { logger } from "../utils/logger.js";
import { fork } from 'child_process'

class infoServices{

    getInfo(res){

        logger.info("Request Received: Route: /info Method: GET")
        const childProcess = fork('./utils/info.js')
        childProcess.on('message', info =>{
            logger.info("Fin subproceso")
            res.render('info',{info})
        }) 
    }
}

const services = new infoServices
export default services