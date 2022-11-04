import { normalize, schema, denormalize } from "normalizr";
import {inspect} from 'util'

let messageMainEntity = []

export function normalizer(items){

    let messagesMain = {
        id: 'messages',
        messages:items
    } 

    let usersEntity = new schema.Entity("author", {}, {
        idAttribute: "id"
    })
    let textEntity = new schema.Entity("text", {}, {
        idAttribute: "message"
    })
   const messagesEntity = new schema.Entity("messages", {

        author: usersEntity,
        text: textEntity
    }, {
        idAttribute: "idPost"
    })
    messageMainEntity = new schema.Entity("messagesMain", {

        messages: [messagesEntity]
    })

    let dataNormalize = normalize(messagesMain, messageMainEntity)

    return dataNormalize
}