import { Router } from 'express'
import passport from 'passport';
import upload from '../utils/upload.js'
import {loggerError} from '../utils/logger.js'

let routerLogin = Router();

routerLogin.get('/login', (req,res)=>{

    req.isAuthenticated() ? res.redirect("/") : res.render('pages/login')
})

routerLogin.get('/logout', (req,res)=>{

    let name=[]
    req.isAuthenticated() ? (name = req.user.userName , res.render('pages/logout',{name})) : res.render('pages/login')
})

routerLogin.get('/register', (req,res)=>{

    res.render('pages/register')
})

routerLogin.get('/errorRegister', (req,res)=>{

    res.render('pages/errorRegister')
})

routerLogin.get('/errorLogin', (req,res)=>{

    res.render('pages/errorLogin')
})

routerLogin.get('/products',(req,res)=>{

    if(req.isAuthenticated()){

        let name = req.user.userName
        let email = req.user.email
        let img = req.user.picture
        res.render('pages/products', {name,email,img})

    }else{ res.render('pages/login') }
})

routerLogin.get('/cart',(req,res)=>{

    req.isAuthenticated() ?  res.render('pages/cart') : res.render('pages/login')
})

routerLogin.delete('/logout', async (req,res)=>{

    try{
        req.session.destroy()
        return res.json("done")
    }catch(err){
        loggerError.error(err)
    }
})

routerLogin.post('/register',upload, passport.authenticate('register',{

    failureRedirect:'/errorRegister',
    successRedirect: '/'
}))

routerLogin.post('/login', passport.authenticate('login',{

    failureRedirect:'/errorLogin',
    successRedirect:'/'
}))

export default routerLogin