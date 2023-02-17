import MongoDbContainer from "../../Repository/mongoDbContainer.js";
import { productsModel } from "../../models/productsMongoDbModels.js";
import { promises as fs } from 'fs';

class ProductsDaoMongoDb extends MongoDbContainer{

    constructor(){

        super(productsModel)
    }

    async saveProducts(product){

        let FileToSave = { ...product, timestamp: (new Date(Date.now()).toString()), thumbnail: ''}
        let id = await new productsModel(FileToSave).save()
        return id
        
    }

    async updateproducts(product){

        this.getAll().then(async (allProducts) =>{

            allProducts.forEach(async productsSaved=> {
                if (productsSaved.id.toString() === product.id) {

                    if (product.name !== "")(productsSaved.name = product.nameProduct)
                    if (product.description !== "")(productsSaved.description = product.descriptionProduct)
                    if (product.price !== "")(productsSaved.price = product.price)
                    if (product.thumbnail !== "")(productsSaved.thumbnail = product.thumbnail)
                    if (product.stock !== "")(productsSaved.stock = product.stock)
                    if (product.category !== "")(productsSaved.category = product.categorty)

                    await productsModel.updateOne({
                        id: product.id
                    }, {
                        $set: {
                            name: productsSaved.name,
                            description: productsSaved.description,
                            price: productsSaved.price,
                            thumbnail: productsSaved.thumbnail,
                            stock: productsSaved.stock,
                            category: productsSaved.category
                        }
                    })
                }
            });
        })
    }

    updateImg = async (id) => {

        console.log(typeof(id))
        console.log("aqui llego el id ", id )
        let modify = await productsModel.findByIdAndUpdate({_id:id},{thumbnail: `./public/images/products/${id}`})
       fs.rename('./public/images/products/temporal.jpg', `./public/images/products/${id}.jpg`, function (err) {
            if (err) throw err;
            console.log('File Renamed.');
        });

        console.log(modify)

    }
}

let productsDaoMethods = new ProductsDaoMongoDb;
export default productsDaoMethods