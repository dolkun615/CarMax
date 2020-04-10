import FinancePage from './financePage';

export default class FinanceDicisionPage extends FinancePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/finance`; }

    get getYourResultsASAPText() { return $("//h1[contains(text(),'get your results ASAP')]"); }
    get continueToNextStepButton() { return $("//button[contains(text(),'Continue')]"); }

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
    dicisionPageValidationText = (headerText: string) => {
        browser.waitUntil(() => {
            return this.getYourResultsASAPText.getText().includes(headerText);
        }, 10000);
    };

    constructor(stockNumber = 0) {
        super();
        this.stockNumber = stockNumber;
    }
}