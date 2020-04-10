import FinancePage from './financePage';

export default class FinancePageFive extends FinancePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/finance/app#step-5`; }

    get agreeToTermsInput() { return $("//input[@id='Terms-Agree']"); }
    get saveAndContinueButton() { return $("//button[contains(text(),'Continue')]"); }

    get snapshotOptions() {
        return {
            hideScrollBars: true,
            hideElements: [
                this.feedbackLink,
                this.topToolbar,
                this.saveProgressToast,
                this.progressIndicator
            ]
        };
    }

    constructor(stockNumber: number = 0) {
        super();
        this.stockNumber = stockNumber;
    }
}