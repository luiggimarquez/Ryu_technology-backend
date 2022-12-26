import mongoose from 'mongoose'

const cartsCollection = "carts"

const cartsSchema = new mongoose.Schema({

    id: {type: String, require: true, max: 100},
    timestampCart: {type: String, require: true, max: 100},
    email: {type: String, require: true, max:100 },
    active: {type: Boolean, require: true, max:10},
    products:{type:[{

        nameProduct: {type: String, require: true, max: 100},
        descriptionProduct: {type: String, require: true, max: 100},
        codeProduct: {type: String, require: true, max: 100},
        photoProduct: {type: String, require: true, max: 100},
        priceProduct: {type: Number},
        stockProduct: {type: Number},
        id: {type:Number},
        timestamp: {type: String, require: true, max: 100},
        quantity: {type: Number}
    }]}
})

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)