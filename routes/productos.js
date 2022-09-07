const {Router} = require('express')
const router = Router()
let productos = []
let ID = 0;

router.get('/', (req,res) => {

    res.json(productos)
});


router.get('/:id', (req,res) => {

    let resultado = []
    const { id } = req.params;

    if(productos.length != 0){
        
        resultado = productos.filter(x => x.id.toString() === id)
        if(resultado.length === 0) (resultado = { error : 'producto no encontrado' })
    }else{
        resultado = { error : 'producto no encontrado' }
    }
    res.json(resultado)
} );


router.post('/', (req,res) => {

    let recibido = req.body;
    ID++;
    recibido = {... recibido, id:ID}
    productos.push(recibido)
    res.json(recibido)
} );


router.put('/:id', (req,res) => {
    
    let recibido = req.body;
    const { id } = req.params;
    let boolean = false;

    productos.forEach(x => {

        if(x.id.toString() === id){

            x.tittle = recibido.tittle;
            x.price = recibido.price;
            x.thumbnail = recibido.thumbnail;
            boolean = true;
        }
    })
        
    boolean ? (variable = (`producto Id: ${id} actualizado`)) : (variable = (`producto Id: ${id} no existe`))
    res.send(variable);
} );


router.delete('/:id', (req,res) => {
    
    let variable = []
    const { id } = req.params;
    let respuesta = productos.find( x => x.id === parseInt(id))
    
    if(respuesta === undefined ){ 

        variable = (`producto con id ${id} no existe`)
    } else{

        productos = productos.filter( x => x.id != id)
        variable = (`producto con id ${id} eliminado`)
    }

    res.send(variable)
} );

module.exports = router;