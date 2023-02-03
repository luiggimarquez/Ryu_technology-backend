export const types = `

type Query{

    getProductsTest: [products],
    getMessages: [messages] 
}

type Mutation{

    createMessage(input : CreateMessageInput): [messages]
    deleteMessage(idPost: Int): [messages]
}

type products{

    name: String,
    price: String,
    thumbnail: String  

}

type messages{

    author : Author
    text : Text
    idPost : Int
    
}

type Author{

    id : String
    name : String
    lastName : String
    age : String
    alias : String
    avatar : String
    date : String
}

type Text{

    message : String
}

input CreateMessageInput {

    author : AuthorInput
    text : TextInput
}

input AuthorInput{

    id : String
    name : String
    lastName : String
    age : Int
    alias : String
    avatar : String
    date : String
}

input TextInput{

    message : String

}



`