import ContenedorMongoDb from "../../Contenedores/ContenedorMongoDb.js"
import  {productsModel}  from '../../db/models/mongo/productsModel.js'

class ProductosDaoMongoDb extends ContenedorMongoDb{

    constructor(){

        super(productsModel)
    }

    async saveProducts(product){

        this.getAll().then(async (allProducts) => {
    
            let lastId = Math.max(...allProducts.map(maxItem => maxItem.id)) 
            if (lastId === -Infinity) {lastId = 0}; 
            let FileToSave = {...product, id: (lastId + 1), timestamp: (new Date(Date.now()).toString())}
            const productsSaveModel =await new productsModel(FileToSave).save()
        })
    }

    async updateProducts(product){ 
  
        this.getAll().then(async allProducts => {

            allProducts.forEach(async productsSaved => {
                    
                if (productsSaved.id.toString() === product.id) {

                    if (product.nameProduct !== "")(productsSaved.nameProduct = product.nameProduct)
                    if (product.descriptionProduct !== "")(productsSaved.descriptionProduct = product.descriptionProduct)
                    if (product.codeProduct !== "")(productsSaved.codeProduct = product.codeProduct)
                    if (product.photoProduct !== "")(productsSaved.photoProduct = product.photoProduct)
                    if (product.priceProduct !== "")(productsSaved.priceProduct = product.priceProduct)
                    if (product.stockProduct !== "")(productsSaved.stockProduct = product.stockProduct)

                    await productsModel.updateOne({
                        id: product.id
                    }, {
                        $set: {
                            nameProduct: productsSaved.nameProduct,
                            descriptionProduct: productsSaved.descriptionProduct,
                            codeProduct: productsSaved.codeProduct,
                            photoProduct: productsSaved.photoProduct,
                            priceProduct: productsSaved.priceProduct,
                            stockProduct: productsSaved.stockProduct
                        }
                    })
                }
            })
        })    
    }
}

export default ProductosDaoMongoDb;