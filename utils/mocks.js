import { faker } from '@faker-js/faker/locale/es'

export function mocksProduct(){
    
    const products = {

        name:faker.commerce.product(),    
        price:faker.commerce.price(100, 200, 0),
        thumbnail:faker.image.abstract(600,600,true) 
    }
    return products
}