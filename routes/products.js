const {Router} = require('express');
const { isContext } = require('vm');
const router = Router()
const fs = require("fs");

let products = []
let ID = 0;


async function getAll(){

    

    try{
        let readProducts = await fs.promises.readFile('./routes/productos.txt')
        //let contenidos = JSON.parse(readProducts)
        let contenidos = JSON.parse(readProducts)
            return (contenidos)
        
        
    }catch(err){
        console.log(err);
        let contenidos = null;
        return contenidos
    }
}




router.get("/", (req,res) =>{

    /* let boolean = true;
    if(products.length === 0){ boolean = false;}
    res.render('index', {products,boolean} ) */
    res.sendFile('index.html' ,{ root: './public' } )

})

router.post("/",(req,res) =>{

    let received = req.body;
    products.then(data =>{

        data.push(received)
        let objeto4= JSON.stringify(data, null,2) 
        fs.writeFileSync('./routes/productos.txt',objeto4)
    })

    res.redirect('/')

})

products=getAll()

module.exports = {router, products};


