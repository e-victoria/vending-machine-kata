import Product from './Product';

export default class ProductsController {

    private productsList: Array<Product>;

    constructor() {
        this.productsList = [];
    }

    addProducts(...products: Array<Product>): void {
        this.productsList.push(...products);
    }

    addProduct(product: Product): void {
        this.productsList.push(product);
    }

    getProductByName(productName: string): Product {
        for (let product of this.productsList) {
            if (product.getName() === productName) {
                return product;
            }
        }
    }

    getAvailableProducts(): Array<Product> {
        const availableProducts = [];
        for (let product of this.productsList) {
            const amount: number = product.getAmount()
            if (amount > 0) {
                availableProducts.push(product);
            }
        }

        return availableProducts;
    }

    getAllProducts(): Array<Product> {
        return this.productsList;
    }

    dropProduct(productName: string): void {
        const product: Product = this.getProductByName(productName);
        product.setAmount(product.getAmount() - 1);
    }

}