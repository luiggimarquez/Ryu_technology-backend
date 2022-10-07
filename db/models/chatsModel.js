import { dbSqlite } from "../dbConfig.js";
import { containerChats } from '../db.js'

(async function(){

	try {
		const isTable = await dbSqlite.schema.hasTable(containerChats.nameTable)

		if(!isTable){
			await dbSqlite.schema.createTable(containerChats.nameTable, (table) => {

				table.increments('id').primary().notNullable()
				table.string('chat').notNullable()
			})
			console.log("Tabla SQLite3 creada con exito")
		}

	}catch(error){
    	console.log(error);
	}   
})();
