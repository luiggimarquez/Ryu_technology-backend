import mongoose from 'mongoose'

const productsCollection = "products"

const productsSchema = new mongoose.Schema({

    nameProduct: {type: String, require: true, max:100},
    descriptionProduct: {type: String, require: true, max: 200},
    codeProduct: {type: String, require: true, max: 50},
    photoProduct: {type: String, require: true, max:200},
    priceProduct: {type: Number, require: true},
    stockProduct: {type: Number, require: true},
    id: {type: Number, require: true},
    timestamp: {type: String, require: true, max:100}

})

export const productsModel = mongoose.model(productsCollection, productsSchema)