import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'; 
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService{

    constructor(@InjectModel('Product') private  readonly productModule : Model<Product>){}

    async getProducts(): Promise<Product[]>{
        const products = await this.productModule.find()
        return products;

    }
    async getProduct(productID: string): Promise<Product[]>{
       
        let product = await this.productModule.find({id:productID});
        return product;

    }
    async createProduct(createProductDTO: CreateProductDTO): Promise<Product>{
       let product =  new this.productModule(createProductDTO);
       let products = await this.productModule.find()
       let lastId = Math.max(...products.map(maxItem => maxItem.id)) 
       if (lastId === -Infinity) {lastId = 0}; 
       //let id = products.length
       product.id = lastId + 1
       return await product.save()
      
    }
    async deleteProduct(productID: string): Promise<Product[]>{
        const deletedProduct = await this.productModule.find({id:productID}).deleteOne()
        return deletedProduct
    }
    
    async updateProduct(productID: string, createProductDTO: CreateProductDTO): Promise<any>{
        const findProduct = await this.productModule.find({id: productID})
        console.log(findProduct[0].id)
        const updateProduct = await this.productModule.updateOne({id:findProduct[0].id},{
            $set: {
                name: createProductDTO.name,
                description: createProductDTO.description,
                price: createProductDTO.price,
                imageURL: createProductDTO.imageURL,
                createdAt: Date.now()
            }

        },{new: true})
        console.log(updateProduct)
        return updateProduct;

    }
}
