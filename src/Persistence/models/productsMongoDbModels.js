import mongoose from "mongoose";

const productsCollection = 'products'
const productsSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        max: 100
    },
    price: {
        type: Number,
        require: true,
        max: 99999
    },
    thumbnail: {
        type: String,
        require: true,
        max: 100
    },
    description: {

        type: String,
        require: true,
        max: 1000
    },
    category: {

        type: String,
        require: true,
        max: 100
    },
    timestamp: {

        type: String,
        require: true,
        max: 100
    },
    stock: {
        type: Number,
        require: true
    },
})

export const productsModel = mongoose.model(productsCollection, productsSchema)