import { dbMySql, dbSqlite } from "./dbConfig.js";

class Contenedor {

	constructor(confKnex, nameTable) {

		this.confKnex = confKnex,
		this.nameTable = nameTable
	}

    async getProducts() {

        try {
            const products = await dbMySql.from('products').select("*")
            return products

        } catch (error) {
            console.log(error)
        }
    }

    async saveProducts(products){

        try {
            const {tittle, price, thumbnail} = products
            const productCreated = await dbMySql.from('products').insert({name: tittle,price: price,thumbnail: thumbnail})
        
        } catch (error) {
            console.log(error)
        }
    }

    async saveChats(chat){

        try {
            await dbSqlite.from('chats').insert({chat:chat})
            
        } catch (error) {
            console.log(error)
        }
    } 

    async getChats(){

        try {
            const products = await dbSqlite.from('chats').select("*")
            return products
            
        } catch (error) {
            console.log(error)  
        }
    }
}

const containerProducts = new Contenedor(dbMySql,"products")
const containerChats = new Contenedor(dbSqlite, "chats")
export {containerProducts, containerChats};