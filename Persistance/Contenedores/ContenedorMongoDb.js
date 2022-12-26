class ContenedorMongoDb{

    constructor(collection){

        this.collection =  collection
    }

    async getAll(){

        let itemsRead = await (this.collection).find({})
        return itemsRead
    }
    
    async getById(idItemSearch){

        let result = await (this.collection).find({id:idItemSearch})
        if(result.length === 0) (result = { error : 'producto no encontrado' })
        return result  
    }

    async deleteItem(idItemSearch){

        await (this.collection).deleteOne( {id:idItemSearch})
    }
}

export default ContenedorMongoDb;