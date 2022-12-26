import mongoose from "mongoose";

const usersCollection = "usersEcommerce"
const usersEcommerceSchema = new mongoose.Schema({

    userName: {
        type: String,
        require: true,
        max: 100
    },
    email: {
        type: String,
        require: true,
        max: 100
    },
    password: {
        type: String,
        require: true,
        max: 100
    },
    age: {
        type: Number,
        require: true,
        max: 150
    },
    address: {
        type: String,
        require: true,
        max: 150
    },
    picture: {
        type: String,
        require: true,
        max:150
    },
    phone: {
        type: Number,
        require: true,
        max: 9999999999999
    }
})

export const usersEcommerceModel = mongoose.model(usersCollection, usersEcommerceSchema )