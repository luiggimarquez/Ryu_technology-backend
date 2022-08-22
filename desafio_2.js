class Contenedor{

    constructor(nombre_file){
        this.nombre_file = nombre_file;
    }

    async save(objeto){

        const nombre_archivo= this.nombre_file;
        const fs = require("fs");
        async function verificar(objeto) {
            
            try{ // Se ejecuta cuando el archivo existe
                await fs.promises.stat(`./${nombre_archivo}.txt`)
                let objeto1 = leer_existente(objeto);
                return objeto1
                 
            }catch{ // se ejecuta cuando no hay archivo
                let objeto2={... objeto, id:1}
                guardar(objeto2)
                return objeto2
            }
        }

        async function guardar (obj){

            try{
                let objeto3= JSON.stringify([obj], null,2) 
                await fs.promises.writeFile(`./${nombre_archivo}.txt`,objeto3)
               
            }catch(err){
                console.log(err)
            }
        }

        async function leer_existente (objeto){
          
            try{
                const contenido = await fs.promises.readFile(`./${nombre_archivo}.txt`,'utf-8')
                let contenidos = JSON.parse(contenido)
                let ultimoId=Math.max(...contenidos.map(x=>x.id)) // buscamos el ID mas alto para asignar al siguiente su valor + 1
                if(ultimoId===-Infinity){ultimoId=0}; // Evita que el id de null cuando el archivo existe pero está vacio despues de borrar todo el contenido
				let objetoX = { ...objeto, id:(ultimoId+1)}
				contenidos.push(objetoX)
				let objeto4= JSON.stringify(contenidos, null,2) 
                fs.writeFileSync(`./${nombre_archivo}.txt`,objeto4)
                return (objetoX)

            }catch(err){
                console.log(err);
            }
        }

       const consulta = await verificar(objeto);
       return consulta.id
    }

    async getByID(id){

        const nombre_archivo= this.nombre_file;
        const fs = require("fs");

        try{
            const contenido = await fs.promises.readFile(`./${nombre_archivo}.txt`,'utf-8')
            let contenidos = JSON.parse(contenido)
            let result=contenidos.filter(x => x.id == id)
            if(result.length == 0) { result=null }
            return (result)

        }catch(err){
            console.log("No existe ese ID consultado");
        }
    }

    async getAll(){

        const nombre_archivo= this.nombre_file;
        const fs = require("fs");

        try{
            const contenido = await fs.promises.readFile(`./${nombre_archivo}.txt`,'utf-8')
            let contenidos = JSON.parse(contenido)
            return (contenidos)

        }catch(err){
            console.log('No existe archivo');
            let contenidos = null;
            return contenidos
        }
    }

    async deleteById(number){

        const nombre_archivo= this.nombre_file;
        const fs = require("fs");
        let result = [];

        try{

            const contenido = await fs.promises.readFile(`./${nombre_archivo}.txt`,'utf-8')
            let contenidos = JSON.parse(contenido)
            let resultado = contenidos.find(x => x.id === number)

            if(resultado != undefined) { 
                
                result = contenidos.filter(x => x.id != number)
                console.log('Producto borrado con éxito');
                let objeto5= JSON.stringify(result, null,2)
                fs.promises.writeFile(`./${nombre_archivo}.txt`,objeto5)

            }else{

                console.log('Producto no existe, borrado falló')   
            }
            return result

        }catch{
            console.error('Error, no hay nada para eliminar');
        }
    }

    async deleteAll(){

        const nombre_archivo= this.nombre_file;
        const fs = require("fs");
        let result = [];

        try{
        const contenido = await fs.promises.readFile(`./${nombre_archivo}.txt`,'utf-8')
        let contenidos = JSON.parse(contenido)
        result = contenidos.filter(x => x.id === 0)
        console.log('todos los Productos borrados con éxito');
        let objeto6= JSON.stringify(result, null,2)
        await fs.promises.writeFile(`./${nombre_archivo}.txt`,objeto6)
        }catch(err){

            console.error(err)
        }
    }
}

module.exports = { Contenedor }