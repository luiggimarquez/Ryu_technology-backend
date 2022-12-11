import { Router } from "express";
import { fork } from 'child_process'
import  config  from '../config.js';
import { logger } from "../utils/logger.js";
import cluster from 'cluster'

const routerRandom = Router()

routerRandom.get('/',(req,res)=>{
    
    const cant  = req.query
    logger.info("Request Received: Route: /api/randoms Method: GET")
   
  /*  if(config.MODE === 'FORK'){

        logger.info("Modo Fork Activado")
        const childProcess = fork('./utils/randomNumbers.js')
        childProcess.send(cant)
        childProcess.on('message', result =>{
            logger.info("Proceso: ",process.pid)
            res.json(result)
        }) 
    }else if (config.MODE === "CLUSTER"){

        logger.info("Modo Cluster Activado")
        const childProcess = fork('./utils/randomNumbers.js')
        childProcess.send(cant)
        childProcess.on('message', result =>{
            
            logger.info("Proceso: ",process.pid)
            res.json(result)
        })

    } */

})

export default routerRandom