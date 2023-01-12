import mongoose from 'mongoose'

const usersCollection = "users"

const usersSchema = new mongoose.Schema({

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
    }
})

export const usersModel = mongoose.model(usersCollection, usersSchema)