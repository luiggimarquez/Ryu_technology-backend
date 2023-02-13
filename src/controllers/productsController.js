import services from '../services/productsService.js'

class ProductControllers{

    constructor() {

        this.servicesMethod = services
    }

    getProductsTest = (req, res) => {

        this.servicesMethod.getProductsTest(res)
    }

    getRoot = (req, res) => {

        //const options = this.servicesMethod.getRoot(req)
        //res.sendFile('index.html', options)
        //res.render('products', req.user)
        /* res.set({'Authorization' :'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGIiOlt7Il9pZCI6IjYzZTY4M2NjNjgzZTE4ZjFiNjg3ODY5ZiIsInVzZXJOYW1lIjoiYSIsImVtYWlsIjoiYUBhLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJG9ra3JUUkpwSTZjQTIwOUFtTmJmaXU3ZW9jWVRDSmoxVGxuT0xMUk00djNzMmlkdVZqNmouIiwiX192IjowfV0sImlhdCI6MTY3NjIzMzE1Nn0.L27nuMg_rHrQqJlo1yPYTq5JX3UmJg5mL9h_9ILoQNg'})
        res.json({message : "aqui va products"}) */
        //res.set({'Authorization' :'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGIiOlt7Il9pZCI6IjYzZTY4M2NjNjgzZTE4ZjFiNjg3ODY5ZiIsInVzZXJOYW1lIjoiYSIsImVtYWlsIjoiYUBhLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJG9ra3JUUkpwSTZjQTIwOUFtTmJmaXU3ZW9jWVRDSmoxVGxuT0xMUk00djNzMmlkdVZqNmouIiwiX192IjowfV0sImlhdCI6MTY3NjIzMzE1Nn0.L27nuMg_rHrQqJlo1yPYTq5JX3UmJg5mL9h_9ILoQNg'})
        req.isAuthenticated() ? res.redirect("/products") : res.redirect("/login")
    }

    postRoot = (req, res) => {

        //this.servicesMethod.postRoot(req)
        //console.log(req)
        //res.send(req.user.token)
        //res.redirect('/products', res.user.token)
    }
     
}

let controllers = new ProductControllers
export default controllers 