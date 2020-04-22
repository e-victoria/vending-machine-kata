export default class Product {
    private name: string;
    private imageSrc: string;
    private price: number;
    private amount: number;

    constructor(name, imageSrc, price, amount) {
        this.name = name;
        this.imageSrc = imageSrc;
        this.price = price;
        this.amount = amount;
    }

    getPrice(): number {
        return this.price;
    }

    getImageSrc(): string {
        return this.imageSrc;
    }

    getName(): string {
        return this.name;
    }

    getAmount(): number {
        return this.amount;
    }

    setAmount(amount): void {
        this.amount = amount;
    }
}