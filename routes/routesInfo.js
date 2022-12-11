//import info from "../utils/info.js";
import {Router} from 'express'
import { logger } from "../utils/logger.js";
import compression from 'compression'
import { fork } from 'child_process'


const routerInfo = Router()

routerInfo.get('/infoComp', compression(), (req,res) =>{

    logger.info("Request Received: Route: /infoComp Method: GET")
    res.render('info',{info})


} )

routerInfo.get('/info', (req,res) =>{

    logger.info("Request Received: Route: /info Method: GET")

    const childProcess = fork('./utils/info.js')

    childProcess.on('message', info =>{
        logger.info("Fin subproceso")
        res.render('info',{info})
    }) 
    
} )


export default routerInfo