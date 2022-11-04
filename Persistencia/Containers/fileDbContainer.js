import { promises as fs } from 'fs';
import { normalizer } from '../../utils/normalizr.js'

class fileContainer{

    constructor(path){
        this.path = path;
    }

    async getAll(){

        try {
            const readItems =await fs.readFile(this.path, 'utf8')
            const readItemsParse = JSON.parse(readItems)
            let resultNormalized = normalizer(readItemsParse)
            return resultNormalized

        } catch (err) {
          console.log(err)
        }
    }

    async saveItems(item){
        
        const readItems = await fs.readFile(this.path, 'utf8')
        let Items = JSON.parse(readItems)

        let lastId = Math.max(...Items.map(maxItem => maxItem.idPost))
        if (lastId === -Infinity) {lastId = 0};
        let FileToSave = {...item, idPost: (lastId + 1) }
        Items.push(FileToSave)
        let saveItemsToFile = JSON.stringify(Items, null, 2)
        fs.writeFile(this.path, saveItemsToFile)
        let resultNormalized = normalizer(saveItemsToFile)
        return resultNormalized
    } 
}

export default fileContainer;