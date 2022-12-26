export const firebaseModel = (model, docs) => {
 
    if(model=='products'){

        const response = docs.map((doc) =>({

            nameProduct: doc.data().nameProduct,
            descriptionProduct: doc.data().descriptionProduct,
            codeProduct: doc.data().codeProduct,
            photoProduct: doc.data().photoProduct,
            priceProduct: doc.data().priceProduct,
            id: doc.id,
            timestamp: doc.data().timestamp,
            stockProduct: doc.data().stockProduct
                
        }))
        return response

    }else if(model =='carts'){

        const cartsRead = docs.map((doc) =>({

            id: doc.id,
            timestampCart: doc.data().timestampCart,
            products: doc.data().products     
        }))
        return cartsRead
    }
}