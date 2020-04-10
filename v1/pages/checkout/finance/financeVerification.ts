import Page from '../../page';
import IUser from '../../../../data/IUser';

export default class FinanceVerificationPage extends Page {

    public stockNumber: number;

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/finance/verification`; }

    get lastNameInput() { return $("#name"); }
    get dateOfBirthInput() { return $("#dateOfBirth"); }
    get socialSecurityNumberInput() { return $("#social-security-number"); }
    get continueButton() { return $("button.kmx-button.kmx-button--primary.m-t-l.kmx-button--full"); }

    constructor(stockNumber: number = 0) {
        super();
        this.title = 'Checkout | MyCarMax';
        this.stockNumber = stockNumber;
    }

    autofill(user: IUser) {
        this.lastNameInput.setValue(user.lastName);
        this.dateOfBirthInput.setValue(user.dateOfBirth);
        this.socialSecurityNumberInput.setValue(user.ssnLastFour);
    }

    submit() {
        browser.waitUntil(() => this.continueButton.isEnabled(), 5000);

        this.continueButton.click();

        browser.pause(5000);
    }

    verifyClick(element: WebdriverIO.Element, user: IUser) {

        browser.waitUntil(() => element.isEnabled(), 5000);

        element.click();

        browser.pause(5000);

        let url = browser.getUrl();

        console.log(url);

        if (url.includes('verification')) {

            console.log("The finance verification page has been loaded.");

            this.autofill(user);

            this.submit();

            console.log("The finance verification page has been submitted.");
        }
    }
}