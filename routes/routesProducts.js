const {Router} = require('express')
const router = Router()
const middleware = require('../middleware/middleware')
let files = require('../files/files.js')

router.get('/', (req,res) => {
    
	res.sendFile('products.txt',  { root: './files/' })
})

router.get('/:id', (req,res) => {

    const { id } = req.params;
	files.getProductbyID(id).then((product) =>{

		(product !== "") ? res.send(product) : res.send("producto no encontrado")
	})
})

router.post('/', middleware.admin, (req,res) =>{

    let productReceived = req.body;
    files.saveProducts(productReceived)
})

router.put('/:id', middleware.admin,(req,res) =>{

	const { id } = req.params;
	let productReceived = req.body;
	files.updateProducts({...productReceived,id})  
})

router.delete('/:id', middleware.admin, (req,res) =>{

    let productReceived = req.body;
	files.deleteProducts(productReceived)
})

module.exports = router;