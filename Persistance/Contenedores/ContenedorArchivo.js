import { promises as fs } from 'fs';
import {loggerError} from '../../utils/logger.js'

class ContenedorArchivo{

    constructor(path){

        this.path = path;
    }

    async getAll(){

        try {
            const readProducts =await fs.readFile(this.path, 'utf8')
            const readProductsParse = JSON.parse(readProducts)
            return readProductsParse

        } catch (err) {
          loggerError.error(err)
        }
    }

    async getById(id){

        return this.getAll().then(products => {
    
            let result = products.filter(itemProduct => itemProduct.id == id)
            if(result.length === 0) (result = { error : 'producto no encontrado' })
            return result
        })
    }

    async deleteItem(id){

        this.getAll().then(products => {
    
            let result = products.filter(itemProduct => itemProduct.id != id)
            let saveProductsToFile = JSON.stringify(result, null, 2)
            fs.writeFile(this.path, saveProductsToFile)
        })
    } 
}

export default ContenedorArchivo;