import ProductsController from '../../public/js/ProductsController';
import Product from '../../public/js/Product';

describe("ProductsController", function () {
    let productsController;
    let product1;
    let product2;

    beforeEach(function() {
        productsController = new ProductsController();
        product1 = new Product('mars', 'mars.jpg', 1, 2);
        product2 = new Product('gummies', 'gummy_bears.jpg', 1.2, 1);
        productsController.addProducts(product1, product2);
    });

    it("should get a list of all products", function () {
        const actual = productsController.getAllProducts();
        const expected = [];
        expected.push(product1, product2);

        expect(actual).toEqual(expected);
    });

    it("should get a list of available products", function () {
        const product3 = new Product('bounty', 'bounty-1744070_640.jpg', 1, 0);
        productsController.addProduct(product3);
        const actual = productsController.getAllProducts();
        const expected = [];
        expected.push(product1, product2);

        expect(actual).toEqual(expected);
    });

})