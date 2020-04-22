export default class VendingMachine {
    insertCoin(coin: number): boolean {
        if (coin === 0.01) {
            return false;
        } 
    }
}