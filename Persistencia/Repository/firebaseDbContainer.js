import { firestoreDb } from "../firebaseDbConfig.js";
import { firebaseModel } from "../Models/firebaseDbModel/firebaseModel.js"
import { normalizer } from '../../utils/normalizr.js'
import userDto from '../DTOs/userDTO.js'
export let arrayDto=[]
let i= 0

class firebaseContainer{

    constructor(model){
        this.model = model;
    }

    async getAll(){

        const query = firestoreDb.collection(this.model)
        const querySnapshot = await query.orderBy('author.date', 'asc').get()
        let docs = querySnapshot.docs;
        let result = firebaseModel(this.model, docs)
        result.forEach(dto => {
            arrayDto[i]= new userDto(dto)
            i++;
        });
        let resultNormalizr= normalizer(result)
        return resultNormalizr
    }

    async saveItems(FileToSave){

        let db = firestoreDb.collection(this.model)
        let save =  db.doc().set(FileToSave, { merge: true})
        let resultNormalizr = this.getAll()
        return resultNormalizr
    }  
}

export default firebaseContainer;