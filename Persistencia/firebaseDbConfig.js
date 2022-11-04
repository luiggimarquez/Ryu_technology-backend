import * as admin from 'firebase-admin/app';
import {getFirestore}  from 'firebase-admin/firestore';
import { promises as fs } from 'fs';

let key = await fs.readFile('./Persistencia/files/firebaseKeys.json', 'utf8')
let serviceAccount = JSON.parse(key)
let app = admin.initializeApp({
  credential: admin.cert(serviceAccount),   
});
      
console.log("Base de Datos Firebase Conectada")
let firestoreDb = getFirestore(app)

export {firestoreDb};
