import { normalizer } from '../../utils/normalizr.js'
import userDto from '../DTOs/userDTO.js'
export let arrayDto=[]
let i= 0

class mongoDbContainer{

    constructor(collection){
        this.collection = collection;
    }

    async getAll(){


        let itemsRead = await (this.collection).find({},{_id:0})
        itemsRead.forEach(dto => {
            arrayDto[i]= new userDto(dto)
            i++;
        });
        itemsRead = JSON.stringify(itemsRead)
        itemsRead = JSON.parse(itemsRead)
        //let result = normalizer(itemsRead)
        return itemsRead
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
        //let result = normalizer(readAll)
        console.log(readAll)
        return readAll
    } 

    async deleteOneItem(id){

        console.log("input ___>", id)

        
        const itemToDelete = await this.collection.find({idPost:id})
        await this.collection.find({idPost:id}).deleteOne()
        return itemToDelete



    }
}

export default mongoDbContainer;