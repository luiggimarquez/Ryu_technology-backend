const {Router} = require('express');
const router = Router()
const fs = require("fs");

let products = []
let chats = []
let ID = 0;

async function getAll(){

    try{
        let readProducts = await fs.promises.readFile('./routes/productos.txt')
        let contenidos = JSON.parse(readProducts)
        return (contenidos)
        
    }catch(err){
        console.log(err);
        let contenidos = null;
        return contenidos
    }
}

async function getChats(){

    try{
        let readChats = await fs.promises.readFile('./routes/chat.txt')
        let variable = JSON.parse(readChats)
        return (variable)

    }catch(err){
        console.log(err);
        let contenidos = null;
        return contenidos
    }
}

router.get("/", (req,res) =>{

    res.sendFile('index.html' ,{ root: './public' } )
})

router.post("/",(req,res) =>{

    let received = req.body;
    products.then(data =>{

        data.push(received)
        let object= JSON.stringify(data, null,2) 
        fs.writeFileSync('./routes/productos.txt',object)
    })

    res.redirect('/')
})

async function saveChat(item){

    let readChats = await fs.promises.readFile('./routes/chat.txt')
    let variable = JSON.parse(readChats)        
    variable.push(item)
    let object= JSON.stringify(variable, null,2) 
    fs.writeFileSync('./routes/chat.txt',object)
    return variable
}

products=getAll()
module.exports = {router, products, saveChat,getChats};