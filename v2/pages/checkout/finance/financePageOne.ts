import FinancePage from './financePage';
import IUser from '../../../../data/IUser';
import { setValueIfNoValueExists } from '../../../../utility/helpers';

export default class FinancePageOne extends FinancePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/finance`; }

    get downPaymentInput() { return $("#down-payment"); }
    get firstNameInput() { return $("#applicant-first-name"); }
    get middleNameInput() { return $("#applicant-middle-name"); }
    get lastNameInput() { return $("#applicant-last-name"); }
    get suffixDiv() { return $(".kmx-select__value"); }
    get dateOfBirthInput() { return $("#applicant-date-of-birth"); }
    get socialSecurityNumberInput() { return $("#applicant-social-security-number"); }
    get phoneNumberInput() { return $("#applicant-phone-number"); }
    get textAlertsInput() { return $("#Text-Alerts"); }
    get saveAndContinueButton() { return $("//button[contains(text(),'Save & Continue')]"); }
    get downPaymentAmountInFinancePage() { return $("//input[@id='down-payment']"); }
    get backLink() { return $("//*[contains(text(),'Back') and contains(@type,'button')]"); }
    get weWillStartWithYourDownPaymentText() { return $("//h4[contains(text(),'start with your down payment')]"); }

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

    constructor(stockNumber = 0) {
        super();
        this.stockNumber = stockNumber;
    }

    fillInPageBasedonUserInfo(user: IUser) {
        setValueIfNoValueExists(this.firstNameInput, user.firstName);
        setValueIfNoValueExists(this.lastNameInput, user.lastName);
        setValueIfNoValueExists(this.dateOfBirthInput, user.dateOfBirth);
        setValueIfNoValueExists(this.socialSecurityNumberInput, user.socialSecurityNumber);
        setValueIfNoValueExists(this.phoneNumberInput, user.phoneNumber); 
        this.textAlertsInput.click(); 
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

    financeFirstPageValidation = (headerText: string) => {
        browser.waitUntil(() => {
            return this.weWillStartWithYourDownPaymentText.getText().includes(headerText);
        }, 10000);
    };
}