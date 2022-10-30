import * as admin from 'firebase-admin/app';
import {getFirestore}  from 'firebase-admin/firestore';
import { promises as fs } from 'fs';

let key = await fs.readFile('./db/files/firebaseKeys.json', 'utf8')
let serviceAccount = JSON.parse(key)
let app = admin.initializeApp({
  credential: admin.cert(serviceAccount),   
});
      
console.log("Conectado al Firebase")
let firestoreDb = getFirestore(app)

export {firestoreDb};

  


