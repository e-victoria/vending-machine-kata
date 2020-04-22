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

    controllVendingMachine(product: Product):void {
        const priceField = <HTMLHtmlElement>document.querySelector('.checkout__price');
        const price = <HTMLHtmlElement>document.querySelector('.checkout__monets');
        priceField.style.display ='block';
        price.textContent = `${product.getPrice()}`;
    }

    selectProduct(): void {
        let selected:  Product;
        const products_btn = document.querySelectorAll('.product__btn');
        for (let i: number = 0; i < products_btn.length; i++) {
            products_btn[i].addEventListener('click', (e) => {
                e.preventDefault();
                selected = this.products[i];
                this.controllVendingMachine(selected);
            })
        }
    }

    renderAllProducts(): void {
        const productsContainer = document.querySelector('.products__wrapper');
        this.products = this.vendingMachine.getAllProducts();

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
        btn.setAttribute('type', 'button')
        btn.classList.add('btn', 'product__btn');
        btn.textContent = 'Want this!';

        productDiv.append(title, image, price, btn);
        return productDiv;
    }

}