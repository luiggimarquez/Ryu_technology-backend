import mongoose from "mongoose";

const productsCollection = "products"

const productsSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        max: 100
    },
    price: {
        type: Number,
        require: true,
        max: 100
    },
    thumbnail: {
        type: String,
        require: true,
        max: 100
    }
})

export const productsModel = mongoose.model(productsCollection, productsSchema)