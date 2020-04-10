import FinancePage from './financePage';
import IUser from '../../../../data/IUser';
import { selectDropDownListValue, setValueIfNoValueExists } from '../../../../utility/helpers';

export default class FinancePageTwo extends FinancePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/finance`; }

    get streetAddressInput() { return $("#applicant--address"); }
    get cityInput() { return $("#applicant--city"); }
    get stateInput() { return $("input[name=applicant-state]"); }
    get zipCodeInput() { return $("#applicant-zip"); }
    get housingStatusInputName() { return "applicant-housing"; }
    get monthlyPaymentInputField() { return $("#applicant-monthly-payment"); }
    get moveInDateInput() { return $("#applicant-move-in-date"); }
    get saveAndContinueButton() { return $("//button[contains(text(),'Save & Continue')]"); }
    get whereDoYouLiveText() { return $("//h4[contains(text(),'Where do you live?')]"); }

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

    fillInPageBasedonUserInfo(user: IUser) {
        setValueIfNoValueExists(this.streetAddressInput, user.address.streetAddress);
        setValueIfNoValueExists(this.cityInput, user.address.city);
        setValueIfNoValueExists(this.stateInput, user.address.state);
        setValueIfNoValueExists(this.zipCodeInput, user.address.zipCode);
        selectDropDownListValue(this.housingStatusInputName, user.housingStatus.status);
        this.monthlyPaymentInputField.setValue("1900");
        //setValueIfNoValueExists(this.monthlyPaymentInputField, user.housingStatus.monthlyPayment);
        this.moveInDateInput.waitForEnabled();
        setValueIfNoValueExists(this.moveInDateInput, user.housingStatus.moveInDate);
    }
    financeSecondPageValidation = (headerText: string) => {
        browser.waitUntil(() => {
            return this.whereDoYouLiveText.getText().includes(headerText);
        }, 10000);
    };
}