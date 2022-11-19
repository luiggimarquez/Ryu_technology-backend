import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { usersModel } from "../../../Persistencia/Models/MongoDbModel/usersMongoDbModels.js"
import bcrypt from "bcrypt";

passport.use('register',new LocalStrategy({

    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true

    }, async(req,email,password,done)=>{
       
        const userDb = await usersModel.find({email})
        if(userDb.length > 0){ 

            return done(null,false)
        }else{

            const user = new usersModel()
            const saltRounds = 10;

            // Encrypted password storage by bcrypt

            bcrypt.hash(password, saltRounds, function(err, hash) {

                user.userName = req.body.userName
                user.email = email
                user.password = hash
                user.save() 
            }); 
            
            done(null, [user])
        }
    }
))


passport.use('login', new LocalStrategy ({

    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true

    }, async(req, email, password, done)=>{
  
        const userDb = await usersModel.find({ email })
        if(userDb.length === 0){
            return done(null, false)
        }
            
        // verification of the encrypted password saved in DB with the password from the login

        bcrypt.compare(password, userDb[0].password, function(err, result) {
        
            (result) ? done(null, userDb) : done(null, false)
        });
    })
)

passport.serializeUser((user,done)=>{

    done(null, user[0].id)
})

passport.deserializeUser(async(id, done)=>{

    const userDb = await usersModel.findById(id)
    done(null, userDb)
})

