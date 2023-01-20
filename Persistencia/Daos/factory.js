import * as dotenv from 'dotenv'
dotenv.config()
import config from '../../config.js'

let daoMethodProducts = [];
let daoMethodMessage = [];

switch(config.DAO){

        case "archivoDb":{

            let { default : ProductsDaoFile } = await import ('./products/productsDaoFile.js')
            let { default : MessagesDaoFile } = await import('./messages/messagesDaoFile.js');
            daoMethodProducts = ProductsDaoFile.getInstance();
            daoMethodMessage = MessagesDaoFile.getInstance();
            break;
        }
        case "mongoDb":{

            let { default : ProductsDaoMongoDb } = await import ('./products/productsDaoMongoDb.js')
            let { default : MessagesDaoMongoDb } = await import ('./messages/messagesDaoMongoDb.js')
            daoMethodProducts = ProductsDaoMongoDb.getInstance()
            daoMethodMessage = MessagesDaoMongoDb.getInstance()

            break;
        }
        case "firebaseDb":{

            let { default : ProductsDaoFirebase } = await import ('./products/productsDaoFirebase.js')
            let { default : MessagesDaoFirebaseDb } = await import ('./messages/messagesDaoFirebase.js')
            daoMethodProducts = ProductsDaoFirebase.getInstance()
            daoMethodMessage = MessagesDaoFirebaseDb.getInstance()
            break;
        }
}

export { daoMethodProducts, daoMethodMessage }