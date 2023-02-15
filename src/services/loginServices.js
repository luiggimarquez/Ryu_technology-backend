import { logger, loggerError } from '../../utils/log.js'

class LoginServices {

    getLogin(){

        logger.info("Request Received: Route: /login Method: GET")
    }

    getLogout(){

        logger.info("Request Received: Route: /logout Method: GET")
    }

    getRegister(){

        return logger.info("Request Received: Route: /register Method: GET")
    }

     getErrorRegister(){

        logger.info("Request Received: Route: /errorRegister Method: GET") 
    }

    getErrorLogin(){

        logger.info("Request Received: Route: /errorLogin Method: GET")
    }
    
    async deleteLogout(req){

        try {
            setTimeout(()=>{
               req.destroy() 
            },500)
           
        } catch (error) {
            loggerError.error(error)
        }
    }
}

const services =  new LoginServices
export default services