import * as admin from 'firebase-admin/app';
import {getFirestore}  from 'firebase-admin/firestore';
import config from '../config.js'
import { logger } from '../utils/logger.js'

let key = JSON.stringify(config.FIREBASESESSION)
let serviceAccount = JSON.parse(key)
let app = admin.initializeApp({
  credential: admin.cert(serviceAccount),   
});
      
logger.info("Base de Datos Firebase Conectada")
let firestoreDb = getFirestore(app)

export {firestoreDb};
