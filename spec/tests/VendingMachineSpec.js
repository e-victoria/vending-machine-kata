import VendingMachine from '../../public/js/VendingMachine';

describe("VendingMachine", function () {
    let vendingMachine;

    beforeEach(function() {
        vendingMachine = new VendingMachine();
    });

    it("should reject pennies", function () {
        const actual = vendingMachine.insertCoin(0.01);
        const expected = false;

        expect(actual).toEqual(expected);
    });

    it("should reject invalid coins", function () {
        const actual = vendingMachine.insertCoin(5);
        const expected = false;

        expect(actual).toEqual(expected);
    });

    it("should accept a nickel", function () {
        const actual = vendingMachine.insertCoin(0.05);
        const expected = true;

        expect(actual).toEqual(expected);
    });

    it("should accept a dime", function () {
        const actual = vendingMachine.insertCoin(0.1);
        const expected = true;

        expect(actual).toEqual(expected);
    });

    it("should accept a quarter", function () {
        const actual = vendingMachine.insertCoin(0.25);
        const expected = true;

        expect(actual).toEqual(expected);
    });

    it("update coin amount", function () {
        vendingMachine.setCoinsAmount(0.25);
        vendingMachine.insertCoin(0.25);
        const actual = vendingMachine.getCoinsAmount();
        const expected = 0;

        expect(actual).toEqual(expected);
    });

    it("update coin amount", function () {
        vendingMachine.setCoinsAmount(1);
        vendingMachine.insertCoin(0.25);
        vendingMachine.insertCoin(0.1);
        const actual = vendingMachine.getCoinsAmount();
        const expected = 1 - 0.35;

        expect(actual).toEqual(expected);
    });

    it("return -0.25 when client paid over the product price", () => {
        vendingMachine.setCoinsAmount(1);
        for (let i = 0; i < 5; i++) {
            vendingMachine.insertCoin(0.25);
        }
        const actual = vendingMachine.getCoinsAmount();
        const expected = -0.25;

        expect(actual).toEqual(expected);
    });

    it("return 0 when client paid the product price", () => {
        vendingMachine.setCoinsAmount(1);
        for (let i = 0; i < 4; i++) {
            vendingMachine.insertCoin(0.25);
        }
        const actual = vendingMachine.getCoinsAmount();
        const expected = 0;

        expect(actual).toEqual(expected);
    });

    it("return give change back", () => {
        vendingMachine.setCoinsAmount(1);
        for (let i = 0; i < 3; i++) {
            vendingMachine.insertCoin(0.25);
        }
        const actual = vendingMachine.giveMoneyBack();
        const expected = 0.25;

        expect(actual).toEqual(expected);
    });

})