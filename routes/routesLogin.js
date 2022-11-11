import {Router} from 'express'
const routerLogin = Router()

routerLogin.get("/login", (req,res)=>{

   res.render('login')
})

routerLogin.get("/logout", (req,res)=>{

    let name = req.session.name
    res.render('logout',{name})
})

routerLogin.delete("/logout",(req,res)=>{

    req.session.destroy()
})

export default routerLogin