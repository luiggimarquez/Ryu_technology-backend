import passport from 'passport'
import { Strategy as LocalStrategy } from "passport-local"
import { usersModel } from "../Persistence/models/usersMongoDbModels.js";
import bcrypt from "bcrypt";
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import jsonwebtoken from 'jsonwebtoken'


passport.use('register', new LocalStrategy({

    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true

    }, async(req, email, password, done)=>{

        const userDb = await usersModel.find({email})
        if(userDb.length > 0){
            return done(null,false)
        }else{
            const user =  new usersModel();
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds, function(err,hash){

                user.userName = req.body.userName
                user.email = email
                user.password = hash
                user.save()
            });
            done(null,[user])
        }
    })
)

passport.use('login', new LocalStrategy({

    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true

    }, async(req, email, password, done)=>{

        
        const userDb = await usersModel.find({email})
        if(userDb.length === 0){
            return done(null, false)
        }

        bcrypt.compare(password,userDb[0].password, function(err, result){

            if(result) {

                const token =jsonwebtoken.sign({userDb} ,'your_jwt_secret');
            //return res.json({user, token})
                done(null,{userDb, token})
            
            } else{ done(null,false)}
        })
    })
)

const cookieExtractor = req => {
    let jwt = null 
    console.log(req.cookies)
    //console.log(req.Symbol(kHeaders))
    if (req && req.cookies) {
        
        jwt = req.cookies['token']
    }

    return jwt
}


passport.use(new JWTStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey   : 'your_jwt_secret'
  },
   function(jwtPayload, done) {
    console.log(jwtPayload.userDb[0]._id)
    
     return usersModel.findById(jwtPayload.userDb[0]._id)
     .then(user => 
     {

        //console.log(user)
       return done(null, user);
     }
   ).catch(err => 
   {console.log(err)
     return done(err);
   });
  }
  ))



passport.serializeUser((user,done)=>{

    //console.log(user.userDb[0])
    done(null, user.userDb[0].id)
})

passport.deserializeUser(async(id, done)=>{

    const userDb = await usersModel.findById(id)
    done(null, userDb)
})

