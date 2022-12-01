import { Router } from "express";
import { fork } from 'child_process'
import  config  from '../config.js';
import cluster from 'cluster'

const routerRandom = Router()

routerRandom.get('/',(req,res)=>{
    
    const cant  = req.query
   
   if(config.MODE === 'FORK'){

        console.log("Modo Fork Activado")
        const childProcess = fork('./utils/randomNumbers.js')
        childProcess.send(cant)
        childProcess.on('message', result =>{
            console.log("Proceso: ",process.pid)
            res.json(result)
        }) 
    }else if (config.MODE === "CLUSTER"){

        console.log("Modo Cluster Activado")
        const childProcess = fork('./utils/randomNumbers.js')
        childProcess.send(cant)
        childProcess.on('message', result =>{
            
            console.log("Proceso: ",process.pid)
            res.json(result)
        })



    }

})

export default routerRandom