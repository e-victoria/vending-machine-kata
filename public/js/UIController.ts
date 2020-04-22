import Product from "./Product";
import VendingMachine from "./VendingMachine";

export default class UIController {

    private vendingMachine: VendingMachine;
    private products: Array<Product>;

    constructor() {
        this.vendingMachine = new VendingMachine();
    }

    start(): void {
        this.vendingMachine.initWithProducts();
        this.renderAllProducts();
    }

    waitForCoins(): void {
        const checkoutBtn = document.querySelector('.checkout__btn');
        const price = <HTMLHtmlElement>document.querySelector('.checkout__monets');
        const input = <HTMLInputElement>document.getElementById('coins');
        checkoutBtn.removeAttribute('disabled');

        checkoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const insertedCoin = parseFloat(input.value);
            const validCoin: boolean = this.vendingMachine.insertCoin(insertedCoin);
            if (validCoin) {
                price.textContent = `${(parseFloat(price.textContent) - insertedCoin).toFixed(2)}`;
            }
            if (parseFloat(price.textContent) <= 0) {
                checkoutBtn.setAttribute('disabled', 'true');
            }
        })
    }

    getProductToUserAndGiveСhange(): void {
        //TODO
    }

    updatePriceOnVendingMachine(product: Product):void {
        const priceField = <HTMLHtmlElement>document.querySelector('.checkout__price');
        const price = <HTMLHtmlElement>document.querySelector('.checkout__monets');
        priceField.style.display ='block';
        this.vendingMachine.setCoinsAmount(product.getPrice());
        price.textContent = `${product.getPrice()}`;
        this.waitForCoins();
    }

    selectProduct(): void {
        let selected:  Product;
        const products_btn = document.querySelectorAll('.product__btn');
        for (let i: number = 0; i < products_btn.length; i++) {
            products_btn[i].addEventListener('click', (e) => {
                e.preventDefault();
                selected = this.products[i];
                this.updatePriceOnVendingMachine(selected);
            })
        }
    }

    renderAllProducts(): void {
        const checkoutBtn = document.querySelector('.checkout__btn');
        const productsContainer = document.querySelector('.products__wrapper');
        this.products = this.vendingMachine.getAllProducts();

        checkoutBtn.setAttribute('disabled', 'true');

        for (let product of this.products) {
            productsContainer.appendChild(this.createProduct(product));
        }

        console.log(this.selectProduct());
    }

    createProduct(product: Product): Node {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const title = document.createElement('h3');
        title.classList.add('product__title');
        title.textContent = product.getName();

        const image = document.createElement('img');
        image.classList.add('product__image');
        image.setAttribute('alt', product.getName());
        image.setAttribute('src', `./img/${product.getImageSrc()}`);

        const price = document.createElement('p');
        price.classList.add('product__price');
        price.textContent = product.getPrice() + '$';

        const btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.classList.add('btn', 'product__btn');
        btn.textContent = 'Want this!';

        productDiv.append(title, image, price, btn);
        return productDiv;
    }

}