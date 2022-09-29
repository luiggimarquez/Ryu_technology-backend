const {Router} = require('express')
const router = Router()

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


router.post('/',(req,res) =>{

    let productReceived = req.body;
    files.saveProducts(productReceived)
})

router.put('/:id',(req,res) =>{

	const { id } = req.params;
	let productReceived = req.body;
	files.updateProducts({...productReceived,id})  
})

router.delete('/:id',(req,res) =>{

    let productReceived = req.body;
	files.deleteProducts(productReceived)
	console.log("confirm delete")
})



module.exports = router;