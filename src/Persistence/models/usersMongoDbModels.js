import mongoose from "mongoose";

const userCollection = 'users'
const usersSchema = new mongoose.Schema({

    userName: {
        type: String,
        require: true,
        max: 100
    },
    userLastName:{
        type: String,
        require: true,
        max: 100
    },
    phone:{
        type: Number,
        require: true
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
    isAdmin:{
        type: Boolean,
        require: true
    },
    img:{ 
        type: String,
        require: true,
        max: 300
    }
})

export const usersModel = mongoose.model(userCollection, usersSchema)