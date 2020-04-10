import FinancePage from './financePage';

export default class PaymentMethodPage extends FinancePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/finance`; }

    get financeWithCarMaxTile() { return $("h4=Finance with CarMax"); }
    get financeElsewhereTile() { return $("h4=Finance elsewhere"); }
    get payCashTile() { return $("h4=Paying cash"); }
    get continueButton() { return $("button=Continue"); }
    

    get snapshotOptions() {
        return {
            hideScrollBars: true,
            hideElements: [
                this.feedbackLink,
                this.topToolbar
            ]
        };
    }

    constructor(stockNumber: number = 0) {
        super();
        this.title = 'Checkout | CarMax';
        this.stockNumber = stockNumber;
    }
}