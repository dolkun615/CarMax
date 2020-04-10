import { arrangeTestSession, register, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import CheckoutPage from '../../../pages/checkout/checkout';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import PaymentMethodPage from '../../../pages/checkout/finance/paymentMethod';
import FinancePageOne from '../../../pages/checkout/finance/financePageOne';
import FinancePageTwo from '../../../pages/checkout/finance/financePageTwo';
import FinancePageThree from '../../../pages/checkout/finance/financePageThree';
import FinancePageFour from '../../../pages/checkout/finance/financePageFour';
import FinancePageFive from '../../../pages/checkout/finance/financePageFive';
import FinanceDicisionPage from '../../../pages/checkout/finance/financeDecisionPage';
import User from '../../../../data/user';
import Retired from '../../../../data/employment/Retired';

describe('Finance V2, Retired', () => {

    const user = new User();
    user.employment = new Retired();
    const checkoutPage: CheckoutPage = new CheckoutPage(1002);
    const paymentMethodPage: PaymentMethodPage = new PaymentMethodPage(1002);
    const financePageOne: FinancePageOne = new FinancePageOne(1002);
    const financePageTwo: FinancePageTwo = new FinancePageTwo(1002);
    const financePageThree: FinancePageThree = new FinancePageThree(1002);
    const financePageFour: FinancePageFour = new FinancePageFour(1002);
    const financePageFive: FinancePageFive = new FinancePageFive(1002);
    const financeDicisionPage: FinanceDicisionPage = new FinanceDicisionPage(1002);
    const tradeInPage: TradeInPage = new TradeInPage(1002);

    before(() => {
        console.log(`The current user under test is: ${user.userName}`);
        console.log(`The current employment type is: ${user.employment.status}`);
        arrangeTestSession(RegisterPage.url);
        register(user);
        browser.url(checkoutPage.startProgressionUrl());
    });
    it('I can route to Payment Options page', () => {
        checkoutPage.open();
        waitUntilUrlIncludes("vehicle-history");
        checkoutPage.saveAndContinueButton.click();
        waitUntilUrlIncludes("trade-in");
        tradeInPage.iAmNotTradingInButton.click();
        tradeInPage.saveAndcontinueButton.click();
        waitUntilUrlIncludes("finance");
    });
    it('I can select my financing options', () => {
        paymentMethodPage.financeWithCarMaxTile.isDisplayed().should.be.true;
        paymentMethodPage.financeElsewhereTile.isDisplayed().should.be.true;
        paymentMethodPage.payCashTile.isDisplayed().should.be.true;
    });
    it('I can select CarMax financing', () => {
        paymentMethodPage.financeWithCarMaxTile.click();
        paymentMethodPage.continueButton.waitForEnabled(3000);
        paymentMethodPage.continueButton.click();
        financePageOne.financeFirstPageValidation("We'll start with your down payment");
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
        financePageTwo.financeSecondPageValidation("Where do you live?");
    });
    it('I can complete page two of a finance application', () => {
        financePageTwo.fillInPageBasedonUserInfo(user);
        financePageTwo.saveAndContinueButton.waitForEnabled();
        financePageTwo.saveAndContinueButton.click();
        financePageThree.financeThirdPageValidation("Your job and income*");
    });
    it('I can complete page three of a finance application', () => {
        financePageThree.fillInPageBasedOnUserEmployment(user.employment);
        financePageThree.saveAndContinueButton.waitForEnabled();
        financePageThree.saveAndContinueButton.click();
        financePageFour.financeFourthPageValidation("Are you applying with a co-applicant?");
    });
    it('I can complete page four of a finance application', () => {
        financePageFour.saveAndContinueButton.click();
        financePageFive.financeFifthPageValidation("Last step, let's review your info");
    });
    it('I can successfully complete a finance application', () => {
        financePageFive.agreeToTermsInput.click();
        financePageFive.saveAndContinueButton.waitForEnabled();
        financePageFive.saveAndContinueButton.click();
        financeDicisionPage.dicisionPageValidationText("You'll get your results ASAP");
        financeDicisionPage.continueToNextStepButton.isDisplayed().should.be.true;
    });
});
