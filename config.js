import path from 'path';
import {fileURLToPath} from 'url';
import * as dotenv from 'dotenv'
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let data = dotenv.config({
  path: path.resolve(__dirname, `./.env.${process.env.NODE_ENV}`),
});

const config = {

    DB : data.parsed.DB,
    PORT : parseInt(data.parsed.PORT),
    MONGOSESSION : data.parsed.MONGOSESSION,
    ADMINMAIL : data.parsed.ADMINMAIL,
    NODEMAILER_CODE: data.parsed.NODEMAILER_CODE,
    CODE_JWT: data.parsed.CODE_JWT,
    SESSION_TIME: parseInt(data.parsed.SESSION_TIME),
    JWT_SESSION_TIME: data.parsed.JWT_SESSION_TIME,
    NODEMAILER_MAIL: data.parsed.NODEMAILER_MAIL,
    NODEMAILER_HOST: data.parsed.NODEMAILER_HOST,
    NODEMAILER_PORT: parseInt(data.parsed.NODEMAILER_PORT)

}

export default config