import FinancePage from './financePage';
import IEmployment from '../../../../data/employment/IEmployment';
import Retired from '../../../../data/employment/Retired';
import { setValueIfNoValueExists, selectDropDownListValue } from '../../../../utility/helpers';
import Military from '../../../../data/employment/Military';
import Employed from '../../../../data/employment/Employed';
import SelfEmployed from '../../../../data/employment/SelfEmployed';
import Unemployed from '../../../../data/employment/Unemployed';

export default class FinancePageThree extends FinancePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/finance/app#step-3`; }

    get employmentStatusInputName() { return "applicant--employment-status"; }
    get employerNameInput() { return $("#applicant-employer-name"); }
    get employerPhoneNumberInput() { return $("#applicant-employer-phone-number"); }
    get businessNameInput() { return $("#applicant-business-name"); }
    get businessPhoneNumberInput() { return $("#applicant-business-phone-number"); }
    get militaryBranchInput() { return $("#applicant-military-branch"); }
    get payGradeInput() { return $("#applicant-pay-grade"); }
    get incomeSourceSelectHandle() { return $('//div[contains(text(),"Source")]/following-sibling::div[@class="kmx-select__value"]'); }
    get incomeSourceInputName() { return "applicant-income-source"; }
    get retiredSinceInput() { return $("#applicant-retired-since"); }
    get unemployedSinceInput() { return $("#applicant-unemployed-since"); }
    get jobTitleInput() { return $("#applicant-job-title"); }
    get annualIncomeInput() { return $("#applicant-annual-income"); }
    get startDateInput() { return $("#applicant-start-date"); }
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

    fillInPageBasedOnUserEmployment(employment: IEmployment) {

        selectDropDownListValue(this.employmentStatusInputName, employment.status);

        switch (employment.status) {

            case "Retired":
                const retired = <Retired>employment;
                selectDropDownListValue(this.incomeSourceInputName, retired.incomeSource);
                this.annualIncomeInput.setValue(retired.annualIncome);
                setValueIfNoValueExists(this.retiredSinceInput, retired.retiredSince);
                break;

            case "Unemployed":
                const unemployed = <Unemployed>employment;
                selectDropDownListValue(this.incomeSourceInputName, unemployed.incomeSource);
                this.annualIncomeInput.setValue(unemployed.annualIncome);
                setValueIfNoValueExists(this.unemployedSinceInput, unemployed.unemployedSince);  
                break;

            case "Military":
                const military = <Military>employment;
                this.militaryBranchInput.waitForDisplayed();
                setValueIfNoValueExists(this.militaryBranchInput, military.militaryBranch);
                setValueIfNoValueExists(this.payGradeInput, military.payGrade);
                setValueIfNoValueExists(this.employerPhoneNumberInput, military.employerPhoneNumber);
                this.annualIncomeInput.setValue(employment.annualIncome);
                setValueIfNoValueExists(this.startDateInput, military.startDate);
                break;

            case "Employed":
                const employed = <Employed>employment;
                this.employerNameInput.waitForDisplayed();
                setValueIfNoValueExists(this.employerNameInput, employed.employerName);
                setValueIfNoValueExists(this.jobTitleInput, employed.jobTitle);
                setValueIfNoValueExists(this.employerPhoneNumberInput, employed.employerPhoneNumber);
                this.annualIncomeInput.setValue(employment.annualIncome);
                setValueIfNoValueExists(this.startDateInput, employed.startDate);
                break;

            case "Business Owner / Self-Employed":
                const selfEmployed = <SelfEmployed>employment;
                this.businessNameInput.waitForDisplayed();
                setValueIfNoValueExists(this.businessNameInput, selfEmployed.businessName);
                setValueIfNoValueExists(this.jobTitleInput, selfEmployed.jobTitle);
                setValueIfNoValueExists(this.businessPhoneNumberInput, selfEmployed.businessPhoneNumber);
                this.annualIncomeInput.setValue(employment.annualIncome);
                setValueIfNoValueExists(this.startDateInput, selfEmployed.startDate);
                break;
        }
    }
}