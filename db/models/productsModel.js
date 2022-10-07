import { dbMySql } from "../dbConfig.js";
import { containerProducts }  from '../db.js'

(async function () {

	try {
		const isTable = await dbMySql.schema.hasTable(containerProducts.nameTable)

		if(!isTable){
			await dbMySql.schema.createTable(containerProducts.nameTable, (table) => {

				table.increments('id').primary().notNullable()
				table.string('name').notNullable()
				table.integer('price').notNullable()
				table.string('thumbnail').notNullable()
			})
			console.log("Tabla MYSQL creada con exito");
		}

	} catch (error) {
		console.log(error);
	}
})();