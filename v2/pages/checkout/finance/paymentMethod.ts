import FinancePage from './financePage';

export default class PaymentMethodPage extends FinancePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/finance`; }

    get financeWithCarMaxTile() { return $("//*[contains(text(),'Finance with CarMax')]//parent::div"); }
    get payCashTile() { return $("//*[contains(text(),'Pay Cash')]//parent::div"); }
    get financeElsewhereTile() { return $("//*[contains(text(),'Finance Elsewhere')]//parent::div"); }
    get continueButton() { return $("//button[contains(text(),'Save & Continue')]"); }
    get saveAndContinueButton() { return $("//button[contains(text(),'Save & Continue')]"); }
    get backLink() { return $("//*[contains(text(),'Back') and contains(@type,'button')]"); }

    get snapshotOptions() {
        return {
            hideScrollBars: true,
            hideElements: [
                this.feedBackLink,
                this.topToolbar
            ]
        };
    }

    constructor(stockNumber = 0) {
        super();
        this.title = 'Checkout | CarMax';
        this.stockNumber = stockNumber;
    }
}