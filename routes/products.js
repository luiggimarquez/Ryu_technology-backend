const {Router} = require('express')
const router = Router()

router.get('/', (req,res) => {

    res.sendFile('./products.html', { root: './public/' }) 
})

router.get('/:id', (req,res) => {

    const { id } = req.params;
    
})


router.post('/',(req,res) =>{

    let productReceived = req.body;
    console.log(productReceived)


})

router.put('',(req,res) =>{

    
})

router.delete('',(req,res) =>{

    
})


module.exports = router;