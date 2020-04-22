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

})