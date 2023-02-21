import * as dotenv from 'dotenv'
dotenv.config()


const config = {

    DB : process.env.DB,
    PORT : process.env.PORT,
    MONGOSESSION : process.env.MONGOSESSION,
    ADMINMAIL : process.env.ADMINMAIL,
    TWILIOSID : process.env.TWILIOSID,
    TWILIOTOKEN : process.env.TWILIOTOKEN


}


export default config