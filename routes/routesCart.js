const {Router} = require('express')
const router = Router()
const files = require('../files/files.js')


router.get('/', (req,res) => {

    res.sendFile('carts.txt',  { root: './files/' })
})


router.post('/', (req,res) => {

    let productReceived = req.body;
    files.createCart(productReceived)
    res.send(productReceived.idCart)
      
})


router.delete('/:id',(req,res) =>{

    const { id } = req.params
    files.deleteCart(id)
})

router.get('/:id/productos' ,(req,res) =>{

    const {id} = req.params;
    getProductsCartById(id).then( products =>{
        res.send(products)
    }) 
})

router.post('/:id/productos',(req,res) =>{

    const {id} = req.params;
    let products = req.body;
    files.addItemCar(products,id) 
})

router.delete('/:id/productos/:id_prod',(req,res) =>{

    const{ id, id_prod} = req.params;
    files.deleteItemCart(id,id_prod)

})    

module.exports = router;