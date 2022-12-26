import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { usersEcommerceModel } from '../Persistance/models/mongoDb/userMongoDbModels.js'
import bcrypt from 'bcrypt'

passport.use('register', new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    }, async(req, email, password, done)=>{

        const userDb  = await usersEcommerceModel.find({email})
        if(userDb.length>0){
            return done(null,false)
        }else{

            const user = new usersEcommerceModel()
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds, function(err,hash){

                user.userName = req.body.userName
                user.email = email
                user.password = hash
                user.address = req.body.address
                user.age = req.body.age
                user.phone = req.body.phone
                user.picture = `/img/pictures-registers/${req.body.email}.jpg`
                user.save()
            })

            done(null, [user])
        }
    }
    
))

passport.use('login', new LocalStrategy({

    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true

    }, async(req,email, password,done)=>{

        const userDb = await usersEcommerceModel.find({ email })
        if(userDb.length === 0){
            return done(null, false)
        }

        bcrypt.compare(password,userDb[0].password, function(err,result){

            (result) ? done(null, userDb) : done(null, false)
        })
    }
))

passport.serializeUser((user,done)=>{

    done(null, user[0].id)
})

passport.deserializeUser(async(id, done)=>{

    const userDb = await usersEcommerceModel.findById(id)
    done(null, userDb)
})

