import { normalizer } from '../../utils/normalizr.js'

class mongoDbContainer{

    constructor(collection){
        this.collection = collection;
    }

    async getAll(){

        let itemsRead = await (this.collection).find({},{_id:0})
        itemsRead = JSON.stringify(itemsRead)
        itemsRead = JSON.parse(itemsRead)
        let result = normalizer(itemsRead)
        return result
    }

    async saveItems(item){

        let itemsRead = await (this.collection).find()
        let lastId = Math.max(...itemsRead.map(maxItem => maxItem.idPost)) 
        if (lastId === -Infinity) {lastId = 0}; 
        let FileToSave = {...item, idPost: (lastId + 1)}
        await this.collection(FileToSave).save()
        let readAll = await (this.collection).find({},{_id:0})
        readAll = JSON.stringify(readAll)
        readAll = JSON.parse(readAll)
        let result = normalizer(readAll)
        return result
    } 
}

export default mongoDbContainer;