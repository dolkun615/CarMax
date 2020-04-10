import { arrangeTestSession, register, waitUntilUrlIncludes, validatePageTitle } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import CheckoutPage from '../../../pages/checkout/checkout';
import PaymentMethodPage from '../../../pages/checkout/finance/paymentMethod';
import FinancePageOne from '../../../pages/checkout/finance/financePageOne';
import FinancePageTwo from '../../../pages/checkout/finance/financePageTwo';
import FinancePageThree from '../../../pages/checkout/finance/financePageThree';
import FinancePageFour from '../../../pages/checkout/finance/financePageFour';
import FinancePageFive from '../../../pages/checkout/finance/financePageFive';
import User from '../../../../data/user';
import Retired from '../../../../data/employment/Retired';

describe('V1 Finance application, Retired', () => {

    const user = new User();
    user.employment = new Retired();
    const checkoutPage: CheckoutPage = new CheckoutPage(1002);
    const paymentMethodPage: PaymentMethodPage = new PaymentMethodPage(1002);
    const financePageOne: FinancePageOne = new FinancePageOne(1002);
    const financePageTwo: FinancePageTwo = new FinancePageTwo(1002);
    const financePageThree: FinancePageThree = new FinancePageThree(1002);
    const financePageFour: FinancePageFour = new FinancePageFour(1002);
    const financePageFive: FinancePageFive = new FinancePageFive(1002);

    before(() => {
        console.log(`The current user under test is: ${user.userName}`);
        console.log(`The current employment type is: ${user.employment.status}`);

        arrangeTestSession(RegisterPage.url);
        register(user, true);
        browser.url(checkoutPage.startProgressionUrl());
    });

    it('I can view the checkout page', () => {
        checkoutPage.open();
        validatePageTitle(checkoutPage.title);
    });

    it('I can select my financing options', () => {
        checkoutPage.choosePaymentMethodCard.waitForDisplayed();
        checkoutPage.choosePaymentMethodCard.click();
        waitUntilUrlIncludes('finance');
        paymentMethodPage.financeWithCarMaxTile.isDisplayed().should.be.true;
        paymentMethodPage.financeElsewhereTile.isDisplayed().should.be.true;
        paymentMethodPage.payCashTile.isDisplayed().should.be.true;
        paymentMethodPage.continueButton.isEnabled().should.be.false;
    });

    it('I can select CarMax financing', () => {
        paymentMethodPage.financeWithCarMaxTile.click();
        paymentMethodPage.continueButton.waitForEnabled(3000);
        paymentMethodPage.continueButton.isEnabled().should.be.true;
        paymentMethodPage.continueButton.click();
        waitUntilUrlIncludes('step-1');
    });

    it('I confirm that my first and last name were prefilled using MyCarMax account information', () => {
        financePageOne.validateFirstName(user.firstName);
        financePageOne.validateLastName(user.lastName);
    });

    it('I can complete page one of a finance application', () => {
        financePageOne.firstNameInput.waitForDisplayed();
        financePageOne.fillInPageBasedonUserInfo(user);
        financePageOne.saveAndContinueButton.waitForEnabled();
        financePageOne.saveAndContinueButton.click();
        waitUntilUrlIncludes('step-2');
    });

    it('I can complete page two of a finance application', () => {
        financePageTwo.fillInPageBasedonUserInfo(user);
        financePageTwo.saveAndContinueButton.waitForEnabled();
        financePageTwo.saveAndContinueButton.click();
        waitUntilUrlIncludes('step-3');
    });

    it('I can complete page three of a finance application', () => {
        financePageThree.fillInPageBasedOnUserEmployment(user.employment);
        financePageThree.saveAndContinueButton.waitForEnabled();
        financePageThree.saveAndContinueButton.click();
        waitUntilUrlIncludes('step-4');
    });

    it('I can complete page four of a finance application', () => {
        financePageFour.applyingWithoutCoApplicantInput.click();
        financePageFour.saveAndContinueButton.waitForEnabled();
        financePageFour.saveAndContinueButton.click();
        waitUntilUrlIncludes('step-5');
    });

    it('I can successfully complete a finance application', () => {
        financePageFive.agreeToTermsInput.click();
        financePageFive.saveAndContinueButton.waitForEnabled();
        financePageFive.saveAndContinueButton.click();
        checkoutPage.financeTaskCardTextIncludes('SUBMITTED FOR REVIEW');
    });
});
