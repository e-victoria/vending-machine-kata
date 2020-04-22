import BillCalculator from '../../public/js/BillCalculator';
import Basket from '../../public/js/Basket';
import FileReader from '../../public/js/FileReader';

describe("BillCalculator", function () {

    let billCalculator;
    let basket;
    let products;
    let fileReader;

    beforeEach(function() {
        fileReader = new FileReader(__dirname + '/prices.csv');
        basket = new Basket();
        products = [1001, 1001, 3401, 1001, 3401, 3401, 3401, 1001, 1243, 1243];
        basket.setProducts(products);
    });

    it("should return basket", function () {
        const actual = basket.getBasket();
        const expected = new Map();
        expected.set(1001, 4);
        expected.set(3401, 4);
        expected.set(1243, 2);

        expect(actual).toEqual(expected);
    });

    it("should return total price for default basket", function () {
        billCalculator = new BillCalculator(basket, fileReader.readFile());
        const actual = billCalculator.calculateBill();
        const expected = 17;

        expect(actual).toBe(expected);
    });

    it("should return total price for new basket", function () {
        const basket2 = new Basket();
        const products2 = [1243, 1243, 1243, 1243, 1243, 1243, 1243, 1243, 1243, 1243, 1001, 1001, 1001, 3401];
        basket2.setProducts(products2);
        billCalculator = new BillCalculator(basket2, fileReader.readFile());
        const actual = billCalculator.calculateBill();
        const expected = 8.25;

        expect(actual).toBe(expected);
    });
    
})