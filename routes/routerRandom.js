import { Router } from "express";
import { fork } from 'child_process'


const routerRandom = Router()


routerRandom.get('/',(req,res)=>{
    
    const cant  = req.query
    const childProcess = fork('./utils/randomNumbers.js')
    
    childProcess.send(cant)
    childProcess.on('message', result =>{
    
        //result = JSON.stringify(result)
        
        //res.render('randomNumbers',{result})
        res.json(result)
    }) 
    
})


export default routerRandom