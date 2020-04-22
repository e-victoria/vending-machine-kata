export default class VendingMachine {
    insertCoin(coin: number): boolean {
        let answer: boolean = false;
        
        if (coin === 0.1 || coin === 0.05 || coin === 0.25) {
            answer = true;
        }

        return answer;
    }
}