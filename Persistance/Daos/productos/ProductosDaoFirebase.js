import ContenedorFirebase from '../../Contenedores/ContenedorFirebase.js'
import { firestoreDb } from '../../Persistance/db/firebaseConfig.js.js'
import { loggerError } from '../../../utils/logger.js'

class ProductosDaoFirebase extends ContenedorFirebase{

    constructor(){

        super("products")
    }

    async saveProducts(product){

        this.getAll().then(async (allProducts) => {

            const query = firestoreDb.collection('products')
            let lastId = Math.max(...allProducts.map(maxItem => maxItem.id)) 
            if (lastId === -Infinity) {lastId = 0}; 
            let FileToSave = {...product, id: (lastId + 1), timestamp: (new Date(Date.now()).toString())}

            try {
                
                let doc = query.doc(`${FileToSave.id}`)
                await doc.create({

                    nameProduct: FileToSave.nameProduct,
                    descriptionProduct: FileToSave.descriptionProduct,
                    codeProduct: FileToSave.codeProduct,
                    photoProduct: FileToSave.photoProduct,
                    priceProduct: FileToSave.priceProduct,
                    stockProduct: FileToSave.stockProduct,
                    timestamp: FileToSave.timestamp,
                    id: FileToSave.id
                })

            } catch (error){

                loggerError.error(error) 
            }
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

                    let db = firestoreDb.collection('products')
                    await db.doc(productsSaved.id).update({
                    
                        nameProduct: productsSaved.nameProduct,
                        descriptionProduct: productsSaved.descriptionProduct,
                        codeProduct: productsSaved.codeProduct,
                        photoProduct: productsSaved.photoProduct,
                        priceProduct: productsSaved.priceProduct,
                        stockProduct: productsSaved.stockProduct
                    })
                }
            })
        })       
    } 
}

export default ProductosDaoFirebase;