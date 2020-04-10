import FinancePage from './financePage';

export default class FinancePageFour extends FinancePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/finance`; }

    get applyingWithoutCoApplicantInput() { return $("#coApplicant-0"); }
    get saveAndContinueButton() { return $("//button[contains(text(),'Save & Continue')]"); }
    get areYouApplyingWithCoApplicant() { return $("//h4[contains(text(),'Are you applying with a co-applicant?')]"); }

    get snapshotOptions() {
        return {
            hideScrollBars: true,
            hideElements: [
                this.feedBackLink,
                this.saveProgressToast
            ]
        };
    }

    constructor(stockNumber = 0) {
        super();
        this.stockNumber = stockNumber;
    }

    financeFourthPageValidation = (headerText: string) => {
        browser.waitUntil(() => {
            return this.areYouApplyingWithCoApplicant.getText().includes(headerText);
        }, 10000);
    };
}

