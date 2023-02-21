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

    async updateProducts(product, id){

        this.getAll().then(async (allProducts) =>{
         
            allProducts.forEach(async productsSaved=> {

                
                if ((productsSaved._id.toString()) === id) {
                    
                    if (product.name !== "")(productsSaved.name = product.name)
                    if (product.description !== "")(productsSaved.description = product.description)
                    if (product.price !== "")(productsSaved.price = product.price)
                    if (product.stock !== "")(productsSaved.stock = product.stock)
                    if (product.category !== "")(productsSaved.category = product.category)

                    await productsModel.updateOne({
                        _id: id
                    }, {
                        $set: {
                            name: productsSaved.name,
                            description: productsSaved.description,
                            price: productsSaved.price,
                            stock: productsSaved.stock,
                            category: productsSaved.category
                        }
                    })
                }
            });
        })
    }

    updateImg = async (id) => {

        let modify = await productsModel.findByIdAndUpdate({_id:id},{thumbnail: `/images/products/${id}.jpg`})
       fs.rename('./public/images/products/temporal.jpg', `./public/images/products/${id}.jpg`, function (err) {
            if (err) throw err;
            console.log('File Renamed.');
        });

    }

    getByCategory = async(category) =>{

        let result = await productsModel.find({ category: category }).exec().catch(error => { return error })
        if (result.length === 0) { (result = { Error: `Producto no encontrado` }) }
        return result

    }
}

let productsDaoMethods = new ProductsDaoMongoDb;
export default productsDaoMethods