export const firebaseModel = (model, docs) => {
    let i = 0;
    if (model == 'products') {

        const response = docs.map((doc) => ({

            name: doc.data().author.name,
            price: doc.data().author.price,
            thumbnail: doc.data().author.thumbnail,

        }))
        return response

    } else if (model == 'messages') {

        const response = docs.map((doc) => ({

            idPost: doc.id,

            author: {

                id: doc.data().author.id,
                name: doc.data().author.name,
                lastName: doc.data().author.lastName,
                age: doc.data().author.age,
                alias: doc.data().author.alias,
                avatar: doc.data().author.avatar,
                date: doc.data().author.date,
            },
            text: {

                message: doc.data().text.message
            }

        }))
        return response
    }
}