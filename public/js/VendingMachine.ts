export default class VendingMachine {
    private coinsAmount: number;

    constructor() {
        this.coinsAmount = 0;
    }

    insertCoin(coin: number): boolean {
        let answer: boolean = false;
        
        if (coin === 0.1 || coin === 0.05 || coin === 0.25) {
            this.coinsAmount += coin;
            answer = true;
        }

        return answer;
    }

    getCoinsAmount(): number {
        return this.coinsAmount;
    }
}