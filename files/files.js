const fs = require("fs");

saveProducts = (product) => {

    getProducts().then(products => {

        let lastId = Math.max(...products.map(x => x.id)) 
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

      
        let result = products.filter(x => x.id.toString() === id)
        if(result.length === 0) (result = { error : 'producto no encontrado' })
       
        return result
    })


}


deleteProducts = (product) => {

    getProducts().then(products => {

        let result = products.filter(x => x.id != product.id)
        let saveProductsToFile = JSON.stringify(result, null, 2)
        fs.writeFileSync('./files/products.txt', saveProductsToFile)
    })

}

updateProducts = (product) => { 
  
    getProducts().then(products => {

        products.forEach(x => {
            
            if (x.id.toString() === product.id) {

                if(product.nameProduct !== "")  (x.nameProduct = product.nameProduct)
                if(product.descriptionProduct !== "") (x.descriptionProduct = product.descriptionProduct)
                if(product.codeProduct !== "")  (x.codeProduct = product.codeProduct)
                if(product.photoProduct !== "")  (x.photoProduct = product.photoProduct)
                if(product.priceProduct !== "")  (x.priceProduct = product.priceProduct)
                if(product.stockProduct !== "")  (x.stockProduct = product.stockProduct)
            }
        })
        let saveProductsToFile = JSON.stringify(products, null, 2)
        fs.writeFileSync('./files/products.txt', saveProductsToFile)
    })
}

module.exports = { saveProducts, getProducts, deleteProducts, updateProducts, getProductbyID };