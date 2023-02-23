import mongoose from 'mongoose'

const ordersCollection = "orders"

    const ordersSchema = new mongoose.Schema({
    _id: { 
        type: String,
        require: true
    },
    timestamp: {
        type: String,
        require: true,
        max: 100 
    },
    userName: {
        type: String,
        require: true,
        max: 100,
    },
    userLastName: {
        type: String,
        require: true,
        max: 100,
    },
    phone: {
        type: Number,
        require: true,
    },
    email: { 
        type: String, 
        require: true, 
        max: 100 
    },
    address: { 
        type: String 
    },
    totalPay:{
        type:Number,
        require: true
    },
    products: {
        type: [
        {
            name: { 
                type: String, 
                require: true, 
                max: 100 
            },
            description: { 
                type: String, 
                require: true, 
                max: 100 
            },
            category: { 
                type: String, 
                require: true, 
                max: 100 
            },
            thumbnail: { 
                type: String, 
                require: true, 
                max: 100 
            },
            price: { 
                type: Number 
            },
            stock: { 
                type: Number 
            },
            _id: { 
                type: String 
            },
            timestamp: { 
                type: String,
                require: true, 
                max: 100 
            },
            quantity: { 
                type: Number 
            },
      },
    ],
  },
});

export const ordersModel = mongoose.model(ordersCollection, ordersSchema)