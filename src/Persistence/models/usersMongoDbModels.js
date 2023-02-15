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
    isAdmin:{
        type: Boolean
    }
})

export const usersModel = mongoose.model(userCollection, usersSchema)