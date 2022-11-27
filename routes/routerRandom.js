import { Router } from "express";
import { fork } from 'child_process'
import { on } from "events";

const routerRandom = Router()


routerRandom.get('/',(req,res)=>{
    
    const cant  = req.query
  
    const childProcess = fork('./utils/randomNumbers.js')
    console.log("aqui: ", cant)
    
    childProcess.send(cant)
    childProcess.on('message', result =>{
        
        console.log("rsultado random: ", result)
    }) 
    
    res.json({error: 404})


})

export default routerRandom