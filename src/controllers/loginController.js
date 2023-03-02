import services from "../services/loginServices.js"
import passport from 'passport'

class LoginControllers{

    constructor(){

        this.servicesMethod = services
    }

    getLogin = (req,res)=>{

        this.servicesMethod.getLogin()
        req.isAuthenticated() ? res.redirect("/"): res.sendFile('./index.html',  {root:'./public/index'})
    }
    
    getLogout = (req,res)=>{
    
        this.servicesMethod.getLogout()
        let name = []
        req.isAuthenticated() ? (name = req.user.userName, res.render('logout.ejs',{name})) : res.redirect("/login")
    }
    
    getRegister = (req,res)=>{
    
        this.servicesMethod.getRegister()
        res.render("register.ejs")
    }
    
    getErrorRegister = (req,res)=>{
    
        this.servicesMethod.getErrorRegister()
        res.render("errorRegister.ejs")  
    }
    
    getErrorLogin = (req,res)=>{
    
        this.servicesMethod.getErrorLogin()
        res.render("errorLogin.ejs")
    }
    
    deleteLogout = async(req,res)=>{
    
        this.servicesMethod.deleteLogout(req.session)
        return res.json("done")
    }
    
    postLoginMiddleware = passport.authenticate('login',{

        failureRedirect:'/errorLogin',
    })

    postRegister =  passport.authenticate('register',{
    
        failureRedirect:'/errorRegister',
    })
    
    postLoginCallBack = (req,res,next)=>{

        res.cookie('token', req.user.token, { httpOnly: true });
        res.redirect("/")
    }

    postRegisterCallBack = (req,res,next)=>{

        res.cookie('token', req.user.token, { httpOnly: true });
        res.redirect("/")
    }

    getUserLogged = (req,res) =>{

        const user = req.user
        res.render('userLogged.ejs',{user})
    }

    getUser = (req, res) => {

        const user = req.user
        res.send(user)
    }
}

let controllers = new LoginControllers
export default controllers