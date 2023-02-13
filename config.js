import * as dotenv from 'dotenv'
dotenv.config()


const config = {

    DB : process.env.DB,
    PORT : process.env.PORT,
    MONGOSESSION : process.env.MONGOSESSION


}


export default config