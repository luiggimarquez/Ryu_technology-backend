import { Schema } from 'mongoose'

export const ProductSchema = new Schema({

    id: String,
    name: String,
    description: String,
    price: Number, 
    imageURL: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});