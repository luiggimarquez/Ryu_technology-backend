import yargs from "yargs"
import * as dotenv from 'dotenv'
dotenv.config()

const MODE_YARGS = yargs(process.argv[2]).default({MODE:'FORK'}).argv
const DAO_YARGS = yargs(process.argv[2]).default({DAO:'mongoDb'}).argv
const PORT_YARGS = yargs(process.argv[3]).default({PORT:'8081'}).argv

const config = {

    DB : process.env.DB,
    MONGOSESSION : process.env.MONGOSESSION,
    FIREBASESESSION : {
        type : process.env.FIREBASE_TYPE,
        project_id : process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key : process.env.FIREBASE_PRIVATE_KEY,
        client_email : process.env.FIREBASE_CLIENT_EMAIL,
        client_id : process.env.FIREBASE_CLIENT_ID,
        auth_uri : process.env.FIREBASE_AUTH_URI,
        token_uri : process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url : process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url : process.env.FIREBASE_CLIENT_X509_CERT_URL
    },
    DAO : DAO_YARGS.DAO,
    PORT : PORT_YARGS.PORT

}

export default config