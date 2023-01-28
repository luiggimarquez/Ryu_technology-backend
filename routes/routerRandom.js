import { Router } from "express";
import controllers from "../Controllers/controllerRandom.js";

const routerRandom = Router()

class RandomRouter{

    constructor(){

        this.controllersMethod = controllers
    }

    init(){
 
        routerRandom.get('/', this.controllersMethod.random)
        return routerRandom
    }

}

let randomRouter = new RandomRouter
export default randomRouter