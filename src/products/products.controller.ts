import {Controller, Post, Body, Get, Param, Patch, Delete} from "@nestjs/common";
import {ProductService} from "./product.service";


@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductService) {}


    @Post()
    async addProduct(@Body() body:{title:string ,desc:string, price:number} ){
        const generatedId = await this.productService.insertProduct(body.title, body.desc, body.price)
        return generatedId
    }


    @Get()
    async getAllProducts(){
        const product = await this.productService.getAll()
        return product
    }

    @Get(":id")
    async getProductById(@Param('id') prodId:string){

        const product = await this.productService.getSingleProduct(prodId)
        return{product:product}

    }

    @Patch(":id")
    async updateProduct(@Param('id') prodId:string, @Body('title') title:string, @Body('desc') description:string, @Body('price') price:number){
    const product = await this.productService.updateProduct(prodId,title,description,price)
        return{
        updated:product
        }

    }

    @Delete(":id")
    async deleteProduct(@Param('id') prodId:string){
       const product  = await this.productService.deleteProduct(prodId)
        return{message:product}
    }


}
