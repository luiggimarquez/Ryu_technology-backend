import yargs from 'yargs'

const MODE_YARGS = yargs(process.argv[2]).argv

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
    MODE : MODE_YARGS.MODE,
    PORT : process.env.PORT,
    CODE : process.env.CODE,
    ADMINMAIL : process.env.ADMINMAIL,
    TWILIOSID : process.env.TWILIOSID,
    TWILIOTOKEN : process.env.TWILIOTOKEN
}

export default config