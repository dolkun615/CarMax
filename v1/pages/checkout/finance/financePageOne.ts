import FinancePage from './financePage';
import IUser from '../../../../data/IUser';
import { setValueIfNoValueExists } from '../../../../utility/helpers';
import faker = require('faker');

export default class FinancePageOne extends FinancePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/finance/app#step-1`; }

    get downPaymentInput() { return $("#down-payment"); }
    get firstNameInput() { return $("#applicant-first-name"); }
    get middleNameInput() { return $("#applicant-middle-name"); }
    get lastNameInput() { return $("#applicant-last-name"); }
    get suffixDiv() { return $(".kmx-select__value"); }
    get dateOfBirthInput() { return $("#applicant-birthday"); }
    get socialSecurityNumberInput() { return $("#applicant-social-security-number"); }
    get phoneNumberInput() { return $("#applicant-phone-number"); }
    get textAlertsInput() { return $("#Text-Alerts"); }
    get saveAndContinueButton() { return $('button*=Save'); }
    get downPaymentAmountInFinancePage() { return $("//input[@id='down-payment']"); }

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

    fillInPageBasedonUserInfo(user : IUser) {
        setValueIfNoValueExists(this.firstNameInput, user.firstName);
        setValueIfNoValueExists(this.lastNameInput, user.lastName);
        setValueIfNoValueExists(this.dateOfBirthInput, user.dateOfBirth);
        setValueIfNoValueExists(this.socialSecurityNumberInput, user.socialSecurityNumber);
        setValueIfNoValueExists(this.phoneNumberInput, user.phoneNumber);  
        //if (faker.random.boolean()) {
        //    this.textAlertsInput.click();
        //}
    }
    validateFirstName = (firstName: string) => {
        browser.waitUntil(() =>  {
        return this.firstNameInput.getValue().includes(firstName);
        }, 10000);
        
    };
    validateLastName = (lastName: string) => {
        browser.waitUntil(() => {
            return this.lastNameInput.getValue().includes(lastName);
        }, 10000);
    };
}