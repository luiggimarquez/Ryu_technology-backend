import info from "../utils/info.js";
import {Router} from 'express'
import { loginUser } from "./middleware/loginUser.js";


const routerInfo = Router()

routerInfo.get('/info', (req,res) =>{

    res.render('info',{info})


} )

export default routerInfo