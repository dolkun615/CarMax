import FinancePage from './financePage';

export default class FinancePageFour extends FinancePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/finance/app#step-4`; }

    get applyingWithoutCoApplicantInput() { return $("#co-applicant-0"); }
    get saveAndContinueButton() { return $('button*=Save'); }

    get snapshotOptions() {
        return {
            hideScrollBars: true,
            hideElements: [
                this.feedbackLink,
                this.saveProgressToast
            ]
        };
    }

    constructor(stockNumber: number = 0) {
        super();
        this.stockNumber = stockNumber;
    }
}