import mongoose from "mongoose";

const messagesCollection = "messages"

const messagesSchema = new mongoose.Schema({

    
    text: {
        message: {
            type: String,
            require: true,
            max: 100
        }
    },
    author: {
        id: {
            type: String,
            require: true,
            max: 100
        },
        name: {
            type: String,
            require: true,
            max: 100
        },
        lastName: {
            type: String,
            require: true,
            max: 100
        },
        age: {
            type: Number,
            require: true,
            max: 100
        },
        alias: {
            type: String,
            require: true,
            max: 100
        },
        avatar: {
            type: String,
            require: true,
            max: 100
        },
        date: {
            type: String,
            require: true,
            max: 100
        }
    },
    idPost: {
        
        type: Number,
        require: true,
        max:100
    }
    
}, { versionKey: false } )

export const messagesModel = mongoose.model(messagesCollection, messagesSchema)

