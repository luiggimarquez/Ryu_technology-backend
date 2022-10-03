const { Console } = require("console");
const fs = require("fs");

saveProducts = (product) => {

    getProducts().then(products => {

        let lastId = Math.max(...products.map(maxItem => maxItem.id)) 
        if (lastId === -Infinity) {lastId = 0}; 
        let FileToSave = {...product, id: (lastId + 1), timestamp: (new Date(Date.now()).toString())}

        products.push(FileToSave)
        let saveProductsToFile = JSON.stringify(products, null, 2)
        fs.writeFileSync('./files/products.txt', saveProductsToFile)
    })
}

getProducts = async () => {

    try {

        let readProducts = await fs.promises.readFile('./files/products.txt')
        let readProductsParse = JSON.parse(readProducts)
        return readProductsParse

    } catch (err) {
        console.log(err)
    }
}

getProductbyID = (id) =>{

    return getProducts().then(products => {

        let result = products.filter(itemProduct => itemProduct.id.toString() === id)
        if(result.length === 0) (result = { error : 'producto no encontrado' })
        return result
    })
}

deleteProducts = (product) => {

    getProducts().then(products => {

        let result = products.filter(itemProduct => itemProduct.id != product.id)
        let saveProductsToFile = JSON.stringify(result, null, 2)
        fs.writeFileSync('./files/products.txt', saveProductsToFile)
    })

}

updateProducts = (product) => { 
  
    getProducts().then(products => {

        products.forEach(productsSaved => {
            
            if (productsSaved.id.toString() === product.id) {

                if(product.nameProduct !== "")  (productsSaved.nameProduct = product.nameProduct)
                if(product.descriptionProduct !== "") (productsSaved.descriptionProduct = product.descriptionProduct)
                if(product.codeProduct !== "")  (productsSaved.codeProduct = product.codeProduct)
                if(product.photoProduct !== "")  (productsSaved.photoProduct = product.photoProduct)
                if(product.priceProduct !== "")  (productsSaved.priceProduct = product.priceProduct)
                if(product.stockProduct !== "")  (productsSaved.stockProduct = product.stockProduct)
            }
        })
        let saveProductsToFile = JSON.stringify(products, null, 2)
        fs.writeFileSync('./files/products.txt', saveProductsToFile)
    })
}

getproductsCart = async () =>{

    try {

        let readProductsCart = await fs.promises.readFile('./files/carts.txt')
        let readProductsCartParse = JSON.parse(readProductsCart)
        return readProductsCartParse

    } catch (err) {
        console.log(err)
    }

}

createCart = (cart) =>{

    getproductsCart().then(file => {

        let newCart = file
        cart.idCart = cart.idCart.toString()
        newCart.push(cart)
        let saveProductsToFile = JSON.stringify(newCart, null, 2)
        fs.writeFileSync('./files/carts.txt', saveProductsToFile)
    }) 
}

addItemCar = (product,id) => {

    getproductsCart().then(productsSaved => {
       
        productsSaved.forEach(cart => {

            if (cart.idCart === id) {

                let index = cart.products.findIndex(itemProduct => itemProduct.id === product.id)

                if(index < 0 ){

                    product = {...product, quantity:1}
                    cart.products.push(product)

                }else{

                    cart.products.forEach(subCart =>{

                        if(subCart.id === product.id){
                         
                            subCart.quantity+=1
                        }
                    })
                }  
            } 
        });

        let saveProductsToFile = JSON.stringify(productsSaved, null, 2)
        fs.writeFileSync('./files/carts.txt', saveProductsToFile)
    })
}

getProductsCartById = (idCart) =>{

    return getproductsCart().then(productsSaved => {

        let result = productsSaved.filter(itemProduct => itemProduct.idCart === idCart)
        if(result.length === 0) (result = { error : 'producto no encontrado' })
        return result
    })
}

deleteCart = (id) => {

    getproductsCart().then(productsSaved => {

        let filtered = productsSaved.filter(allCarts => allCarts.idCart !== id)
        let saveProductsToFile = JSON.stringify(filtered, null, 2)
        fs.writeFileSync('./files/carts.txt', saveProductsToFile)
    })
    
}

deleteItemCart = (id,id_prod) => {
    
    getproductsCart().then(productsSaved => {

        productsSaved.forEach( product =>{

            if(product.idCart === id){

                product.products = product.products.filter(itemProduct => itemProduct.id !== parseInt(id_prod))
            }
        })
        let saveProductsToFile = JSON.stringify(productsSaved, null, 2)
        fs.writeFileSync('./files/carts.txt', saveProductsToFile) 
    })
}

module.exports = { saveProducts, getProducts, deleteProducts, updateProducts, getProductbyID, getproductsCart, getProductsCartById, createCart, addItemCar, deleteCart, deleteItemCart };