import controllersProducts from "../Controllers/controllerProducts.js";
import MessagesDaoMongoDb from "../Persistencia/Daos/messages/messagesDaoMongoDb.js";


export const resolvers = {

    Query:{

        getProductsTest: async() =>{
            
            return controllersProducts.getProductsTest()
        },

        getMessages : async() =>{

            return MessagesDaoMongoDb.getInstance().getAll().then((msg) => {
                return msg
            })
        }
    },

    Mutation:{

        createMessage: async(_,{input})=>{

           return MessagesDaoMongoDb.getInstance().saveItems(input)
        },

        deleteMessage: async(_,{idPost})=>{

            console.log("primero: ", idPost)
            
            return MessagesDaoMongoDb.getInstance().deleteOneItem(idPost).then((msg)=>{
                console.log(msg)
                return msg
            })
        }

    }
}


