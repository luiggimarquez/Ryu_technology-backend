import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Render} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
let id= 0;
@Controller('product')
export class ProductController {
    
    constructor(private productService: ProductService){}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDTO : CreateProductDTO){

        
        const product = await this.productService.createProduct(createProductDTO)
        return res.status(HttpStatus.OK).json({

            message: 'Producto agregado satisfactoriamente',
            product
        });
    }

    @Get('/')
    async getProducts(@Res() res){
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json({
            products
        })

        
    }
    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID){
        const product = await this.productService.getProduct(productID);
        if (product.length === 0)throw new NotFoundException('Product does not exists');
        return res.status(HttpStatus.OK).json({"products": product})
    }

    @Delete('/:productID')
    async deleteProduct(@Res() res, @Param('productID') productID){
        const product =  await this.productService.deleteProduct(productID)
        if (product.length === 0)throw new NotFoundException('Product does not exists');
        return res.status(HttpStatus.OK).json(product);


    }

    @Put('/:productID')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Param('productID') productID){
        const product =  await this.productService.updateProduct(productID, createProductDTO)
        if (product.length === 0)throw new NotFoundException('Product does not exists');
        return res.status(HttpStatus.OK).json(product);


    }

    @Render('/index')
    root() {
      return { message: 'Hello world!' };
    }

 
}
