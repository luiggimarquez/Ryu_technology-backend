
import passport from 'passport'
import services from '../Services/login.js'

const getLogin = (req,res)=>{

    services.getLogin()
    req.isAuthenticated() ? res.redirect("/") : res.render('login')
}

const getLogout = (req,res)=>{

    services.getLogout()
    let name = req.user.userName
    res.render('logout',{name})
}

const getRegister = (req,res)=>{

    services.getRegister()
    res.render("register")
}

const getErrorRegister = (req,res)=>{

    services.getErrorRegister()
    res.render('errorRegister')
}

const getErrorLogin = (req,res)=>{

    services.getErrorLogin()
    res.render('errorLogin')
}

const deleteLogout = async(req,res)=>{

    services.deleteLogout(req.session)
    return res.json("done")

}

const postRegister =  passport.authenticate('register',{

    failureRedirect:'/errorRegister',
    successRedirect: '/'
})

const postLogin = passport.authenticate('login',{

    failureRedirect: '/errorLogin',
    successRedirect: '/' 
})

export { getLogin, getLogout, getRegister, getErrorRegister, getErrorLogin, deleteLogout, postRegister, postLogin }