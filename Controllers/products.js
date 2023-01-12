import services from '../Services/products.js'

const getProductsTest =  (req,res) =>{

   services.getProductsTest(res)
   
}

const getRoot = (req,res)=>{
    
    const options = services.getRoot(req)
    res.sendFile('index.html' , options)
}

const postRoot = (req,res) =>{

    services.postRoot(req)
    res.redirect('/')
}

export { getProductsTest, getRoot, postRoot} 