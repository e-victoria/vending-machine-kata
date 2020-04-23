import Product from "./Product";
import VendingMachine from "./VendingMachine";
import AnimationController from './AnimationController';

export default class UIController {

    private vendingMachine: VendingMachine;
    private products: Array<Product>;
    private selectedProductDOMId: string;
    private selectedProductName: string;
    private price: HTMLHtmlElement;
    private animationController: AnimationController;

    constructor() {
        this.price = <HTMLHtmlElement>document.querySelector('.checkout__monets');
        this.vendingMachine = new VendingMachine();
        this.animationController = new AnimationController();
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

        const handler = (e) => {
            e.preventDefault();
            const insertedCoin = parseFloat(input.value);
            const validCoin: boolean = this.vendingMachine.insertCoin(insertedCoin);
            if (validCoin) {
                price.textContent = `${(parseFloat(price.textContent) - insertedCoin).toFixed(2)}`;
            }
            if (parseFloat(price.textContent) <= 0) {
                checkoutBtn.setAttribute('disabled', 'true');
                this.getProductToUserAndGiveСhange();
                checkoutBtn.removeEventListener('click', handler);
            }
        }

        checkoutBtn.addEventListener('click', handler)

    }

    getProductToUserAndGiveСhange(): void {
        const productWrapper = document.getElementById(this.selectedProductDOMId);
        const image = productWrapper.querySelector('img');
        const imageShadow = <HTMLDivElement>image.cloneNode(true);
        const width: number = image.offsetWidth;
        const top: number = 58;
        const left: number = productWrapper.offsetLeft;
        imageShadow.style.width = width + 'px';
        imageShadow.style.top = top + 'px';
        imageShadow.style.left = `${left}px`;

        productWrapper.appendChild(imageShadow);
        imageShadow.classList.add('selected-transformed');

        const callback = () => {
            productWrapper.removeChild(imageShadow);
        }

        this.animationController.dropElement(imageShadow, [productWrapper.getBoundingClientRect().x - image.width, productWrapper.getBoundingClientRect().y],callback); 
        this.vendingMachine.dropProduct(this.selectedProductName);

        if (this.vendingMachine.getCoinsAmount() < 0) {
            this.vendingMachine.giveMoneyBack();
            this.price.textContent = 0 + '';
        }

        this.renderAllProducts();
    }

    updatePriceOnVendingMachine(product: Product, productId: string):void {
        this.selectedProductDOMId = productId;
        this.selectedProductName = product.getName();
        const priceField = <HTMLHtmlElement>document.querySelector('.checkout__price');
        priceField.style.display ='block';
        this.vendingMachine.setCoinsAmount(product.getPrice());
        this.price.textContent = `${product.getPrice()}`;
        this.waitForCoins();
    }

    selectProduct(): void {
        let selected:  Product;
        const products_btn = document.querySelectorAll('.product__btn');
        for (let i: number = 0; i < products_btn.length; i++) {
            products_btn[i].addEventListener('click', (e) => {
                e.preventDefault();
                selected = this.products[i];
                const id = `product-${selected.getName().toLowerCase()}`
                this.updatePriceOnVendingMachine(selected, id);
            })
        }
    }

    renderAllProducts(): void {
        const checkoutBtn = document.querySelector('.checkout__btn');
        const productsContainer = document.querySelector('.products__wrapper');
        productsContainer.innerHTML = '';
        this.products = this.vendingMachine.getAllProducts();

        checkoutBtn.setAttribute('disabled', 'true');

        for (let product of this.products) {
            productsContainer.appendChild(this.createProduct(product));
        }

        this.selectProduct();
    }

    createProduct(product: Product): Node {
        const productDiv = document.createElement('div');
        productDiv.setAttribute('id', `product-${product.getName().toLowerCase()}`)
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