import FinancePage from './financePage';

export default class FinancePageFive extends FinancePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/finance`; }

    get agreeToTermsInput() { return $("//input[@id='Terms-Agree']"); }
    get saveAndContinueButton() { return $("//button[contains(text(),'Apply & Continue')]"); }
    get letUsReviewYourInfo() { return $("//h4[contains(text(),'review your info')]"); }

    get snapshotOptions() {
        return {
            hideScrollBars: true,
            hideElements: [
                this.feedBackLink,
                this.topToolbar,
                this.saveProgressToast,
                this.progressIndicator
            ]
        };
    }

    financeFifthPageValidation = (headerText: string) => {
        browser.waitUntil(() => {
            return this.letUsReviewYourInfo.getText().includes(headerText);
        }, 10000);
    };

    constructor(stockNumber = 0) {
        super();
        this.stockNumber = stockNumber;
    }
}