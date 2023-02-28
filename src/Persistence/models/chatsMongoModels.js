import mongoose from 'mongoose'

const chatsCollection = "chats"

const chatsSchema = new mongoose.Schema({

    timestamp: {
        type: String,
        require: true,
        max: 100
    },
    email: {
        type: String,
        require: true,
        max:100
    },
    type:{
        type: String
    },
    message:{
        type: String,
        require: true
    }
})

export const chatsModel = mongoose.model(chatsCollection, chatsSchema)