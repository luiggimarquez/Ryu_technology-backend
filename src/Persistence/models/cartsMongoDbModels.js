import mongoose from 'mongoose'

const cartsCollection = "carts"
const cartsSchema = new mongoose.Schema({

    timestampCart: {type: String, require: true, max: 100},
    email: {type: String, require: true, max:100 },
    address:{ type: String},
    active: {type: Boolean, require: true, max:10},
    products:{type:[{

        name: {type: String, require: true, max: 100},
        description: {type: String, require: true, max: 100},
        category: {type: String, require: true, max: 100},
        thumbnail: {type: String, require: true, max: 100},
        price: {type: Number},
        stock: {type: Number},
        _id: {type:String},
        timestamp: {type: String, require: true, max: 100},
        quantity: {type: Number}
    }]}
})

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)