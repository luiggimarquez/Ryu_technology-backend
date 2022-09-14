const {Router} = require('express')
const router = Router()
let products = []
let ID = 0;

router.get("/", (req,res) =>{

    let boolean = true;
    if(products.length === 0){ boolean = false;}
    res.render('index', {products,boolean} )

})

router.post("/",(req,res) =>{

    let received = req.body;
    ID++;
    received = {... received, id:ID}
    products.push(received)
    res.redirect('/')

})

module.exports = router;