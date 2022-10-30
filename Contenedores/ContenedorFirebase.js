import { firestoreDb } from "../db/firebaseConfig.js";
import { firebaseModel} from "../db/models/firebase/firebaseModel.js"


class ContenedorFirebase{

    constructor(model){

        this.model = model
    }

    async getAll(){

        const query = firestoreDb.collection(this.model)
        const querySnapshot = await query.get()
        let docs = querySnapshot.docs;
        let result = firebaseModel(this.model, docs)
        return result
    }
    
    async deleteItem(id){

        await firestoreDb.collection(this.model).doc(id).delete();
    }

    async getById(id){

        return this.getAll().then(productsSaved => {
    
            let result = productsSaved.filter(itemProduct => itemProduct.id == id)
            if(result.length === 0) (result = { error : 'producto no encontrado' })
            return result
        })
    }


}

export default ContenedorFirebase;