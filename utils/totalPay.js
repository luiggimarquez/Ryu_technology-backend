
let getTotalPayOrder = (products) => {
    
    let acumulator = 0
    products.forEach( items =>{
       acumulator += items.quantity * items.price
    })

    let total = acumulator + acumulator*0.21
    return total
}

export default getTotalPayOrder