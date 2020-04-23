import Product from "./Product";
import ProductsController from "./ProductsController";

export default class VendingMachine {
    private coinsAmount: number;
    private productsController: ProductsController;

    constructor() {
        this.productsController = new ProductsController();
        this.coinsAmount = 0;
    }

    setCoinsAmount(price: number): void {
        this.coinsAmount = price;
    }

    initWithProducts(): void {
        const marsBar: Product = new Product('Mars', 'mars.jpg', 1, 8);
        const bountyBar: Product = new Product('Bounty', 'bounty-1744070_640.jpg', 1, 8);
        const gummyBears: Product = new Product('Gummies', 'gummy_bears.jpg', 1.2, 3);
        const chewingGum: Product = new Product('Chewing gum', 'chewing-gum-115163_640.jpg', 0.9, 5);
        const pretzels: Product = new Product('Pretzels', 'pretzel-2759994_640.jpg', 1.2, 2);
        const sandwich: Product = new Product('Sandwich', 'fast-food-2132863_640.jpg', 2, 1);
        const coke: Product = new Product('Coca-cola', 'coke.jpg', 1.8, 3);

        this.productsController.addProducts(marsBar, bountyBar, gummyBears, chewingGum, pretzels, sandwich, coke);
    }

    getProductsController(): ProductsController {
        return this.productsController;
    }

    getAllProducts(): Array<Product> {
        return this.productsController.getAllProducts();
    }

    getAvailableProducts(): Array<Product> {
        return this.productsController.getAvailableProducts();
    }

    insertCoin(coin: number): boolean {
        let answer: boolean = false;
        
        if (coin === 0.1 || coin === 0.05 || coin === 0.25) {
            this.coinsAmount -= coin;
            this.coinsAmount.toFixed(2);
            answer = true;
        }

        return answer;
    }

    getCoinsAmount(): number {
        return this.coinsAmount;
    }

    giveMoneyBack(): number {
        return this.coinsAmount;
    }

    dropProduct(productName: string): void {
        this.productsController.dropProduct(productName);
    }
}