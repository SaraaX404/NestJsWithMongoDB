import {Injectable, NotFoundException} from "@nestjs/common";
import {Product} from './product.model'
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class ProductService{

    constructor(@InjectModel('Product') private readonly ProductModel:Model<Product>) {
    }

    products:Product[] = []

    async insertProduct(title:string, desc:string, price:number){


        const product = await this.ProductModel.create({ title, desc, price})
        console.log(product)
        return product

    }

    async getAll(){
        const products = await this.ProductModel.find({})
        return products
    }

    async getSingleProduct(prodId:string){
        const product = await this.ProductModel.findById(prodId)
        return product
    }

    async updateProduct(prodId:string,title:string,desc:string,price:number){

        let updatedProduct:{title?:string,desc?:string,price?:number} = {

        }

        if(title){
            updatedProduct.title = title
        }

        if(desc){

            updatedProduct.desc = desc
        }

        if(price){
            updatedProduct.price = price
        }
        console.log(updatedProduct)

        const product = await this.ProductModel.findByIdAndUpdate(prodId, updatedProduct, {new:true})

        return product

    }

    async deleteProduct(prodId:string){
        const product = await this.ProductModel.findByIdAndDelete(prodId)


        return {message:`product(${product._id}) deleted successfully`}
    }

    private findProduct(id:string):[Product,number]{
        const productIndex = this.products.findIndex((x)=> x.id == id)
        const product = this.products[productIndex]
        if(!product){
            throw new NotFoundException('Could not find product')
        }
        return [product, productIndex]
    }

}
