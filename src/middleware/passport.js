import passport from 'passport'
import { Strategy as LocalStrategy } from "passport-local"
import { usersModel } from "../Persistence/models/usersMongoDbModels.js";
import bcrypt from "bcrypt";
import { Strategy as JWTStrategy} from 'passport-jwt'
import jsonwebtoken from 'jsonwebtoken'
import { sendEmailRegister } from '../../utils/email.js';
import config from '../../config.js';
import { logger, loggerError } from '../../utils/log.js';

let img=[]

passport.use('register', new LocalStrategy({

    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true

    }, async(req, email, password, done)=>{

        let userDb = await usersModel.find({email})
        if(userDb.length > 0){
            return done(null,false)
        }else{

            let content = [
                {
                    Name: req.body.name,
                    LastName: req.body.lastname,
                    Phone: req.body.phone,
                    Email: req.body.email,
                    Register_date: new Date(Date.now()).toString(),
                },
            ];
            sendEmailRegister(config.ADMINMAIL,`RyuTech: nuevo usuario: ${req.body.name} - ${req.body.email}`,content, 'Tenemos un nuevo usuario registrado en RyuTechnology');
            
            if(!req.file){( img = `./images/pictures-registers/avatar.jpg`)}else{ (img =  `./images/pictures-registers/${req.body.email}.jpg`)}
            let user =  new usersModel();
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds, function(err,hash){

                user.userName = req.body.name
                user.userLastName = req.body.lastname
                user.phone = req.body.phone
                user.email = email
                user.password = hash
                user.isAdmin = false
                user.img = img
                user.save()
            });
            userDb = [user]
            const token =jsonwebtoken.sign({userDb} ,config.CODE_JWT, {expiresIn:config.JWT_SESSION_TIME});
            done(null,{userDb, token})
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
                const token =jsonwebtoken.sign({userDb} ,config.CODE_JWT);
                done(null,{userDb, token})
            
            } else{ done(null,false)}
        })
    })
)

const cookieExtractor = req => {
    let jwt
    (req && req.cookies) && (jwt = req.cookies['token'])
    return jwt
}

passport.use(new JWTStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: config.CODE_JWT
},
    function (jwtPayload, done) {

        return usersModel.findById(jwtPayload.userDb[0]._id)
            .then(user => {
                return done(null, user);
            }
            ).catch(err => {
                logger.error(err)
                loggerError.error(err)
                return done(err);
        });
    }
))

passport.serializeUser((user,done)=>{
    done(null, user.userDb[0].id)
})

passport.deserializeUser(async(id, done)=>{
    const userDb = await usersModel.findById(id)
    done(null, userDb)
})