import * as admin from 'firebase-admin/app';
import {getFirestore}  from 'firebase-admin/firestore';
import config from '../config.js'

let key = JSON.stringify(config.FIREBASESESSION)
let serviceAccount = JSON.parse(key)
let app = admin.initializeApp({
  credential: admin.cert(serviceAccount),   
});
      
console.log("Base de Datos Firebase Conectada")
let firestoreDb = getFirestore(app)

export {firestoreDb};
