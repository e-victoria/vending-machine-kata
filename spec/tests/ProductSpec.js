import Product from '../../public/js/Product';

describe("Product", function () {
    let product;

    beforeEach(function() {
        product1 = new Product('mars', 'mars.jpg', 1, 2);
        product2 = new Product('gummies', 'gummy_bears.jpg', 1.2, 1);
    });

    it("should get product1 price", function () {
        const actual = product1.getPrice();
        const expected = 1;

        expect(actual).toEqual(expected);
    });

    it("should get product2 price", function () {
        const actual = product2.getPrice();
        const expected = 1.2;

        expect(actual).toEqual(expected);
    });

    it("should get product1 amount", function () {
        const actual = product1.getAmount();
        const expected = 2;

        expect(actual).toEqual(expected);
    });

    it("should get product2 amount", function () {
        const actual = product2.getAmount();
        const expected = 1;

        expect(actual).toEqual(expected);
    });

})