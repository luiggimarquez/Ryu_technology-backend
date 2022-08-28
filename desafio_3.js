const Contenedor = require('./productos').Contenedor
let filename = new Contenedor("productos");
const express = require('express')
const app = express()
const PORT = 8080

let all = filename.getAll();
all.then(v => {
    app.get('/productos',((req,res)=>{
    
        res.send(v)  
    }))
});

app.get('/productoRandom',((req,res)=>{
    
    let id = filename.getByID( Math.floor(Math.random()*(10))+1 );
    id.then(v => {

        res.send(v)
    });

}))


const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

