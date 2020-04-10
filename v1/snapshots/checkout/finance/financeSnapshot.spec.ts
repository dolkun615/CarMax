import { arrangeTestSession, saveProgressDelay, register, checkFullPageScreen } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import CheckoutPage from '../../../pages/checkout/checkout';
import PaymentMethodPage from '../../../pages/checkout/finance/paymentMethod';
import FinancePageOne from '../../../pages/checkout/finance/financePageOne';
import FinancePageTwo from '../../../pages/checkout/finance/financePageTwo';
import FinancePageThree from '../../../pages/checkout/finance/financePageThree';
import FinancePageFour from '../../../pages/checkout/finance/financePageFour';
import FinancePageFive from '../../../pages/checkout/finance/financePageFive';
import Employed from '../../../../data/employment/Employed';
import SnapshotUser from '../../../../data/snapshotUser';

describe('Finance application, Employed', () => {
    const user = new SnapshotUser();
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
        browser.pause(2000);
        browser.getTitle().should.equal(checkoutPage.title);

        checkFullPageScreen('CheckoutHub', checkoutPage.snapshotOptions).should.equal(0);
    });

    it('I can select my financing options', () => {
        checkoutPage.choosePaymentMethodCard.waitForDisplayed();
        checkoutPage.choosePaymentMethodCard.click();
        browser.pause(2000);
        browser.getUrl().should.contain('finance');
    });
    it('I can select CarMax financing', () => {
        browser.pause(2000);
        paymentMethodPage.financeWithCarMaxTile.click();
        browser.pause(1000);
        paymentMethodPage.continueButton.isEnabled().should.be.true;

        checkFullPageScreen('PaymentMethodPage', paymentMethodPage.snapshotOptions).should.equal(0);

        paymentMethodPage.continueButton.click();
        browser.pause(3000);
        browser.getUrl().should.contain('step-1');
    });

    it('I confirm that my first and last name were prefilled using MyCarMax account information', () => {
        financePageOne.firstNameInput.waitForDisplayed();
        financePageOne.firstNameInput.getValue().should.equal(user.firstName);
        financePageOne.lastNameInput.getValue().should.equal(user.lastName);
    });

    it('I can complete page one of a finance application', () => {
        financePageOne.firstNameInput.waitForDisplayed();

        checkFullPageScreen('FinancePageOne', financePageOne.snapshotOptions).should.equal(0);

        financePageOne.fillInPageBasedonUserInfo(user);
        financePageOne.saveAndContinueButton.scrollIntoView(false);
        financePageOne.saveAndContinueButton.click();
        browser.pause(1000);
        browser.getUrl().should.contain('step-2');
    });

    it('I can complete page two of a finance application', () => {
        saveProgressDelay();

        checkFullPageScreen('FinancePageTwo', financePageTwo.snapshotOptions).should.equal(0);

        financePageTwo.fillInPageBasedonUserInfo(user);
        financePageTwo.saveAndContinueButton.scrollIntoView(false);
        financePageTwo.saveAndContinueButton.click();
        browser.pause(1000);
        browser.getUrl().should.contain('step-3');
    });

    it('I can complete page three of a finance application', () => {
        saveProgressDelay();

        checkFullPageScreen('FinancePageThree', financePageThree.snapshotOptions).should.equal(0);

        financePageThree.fillInPageBasedOnUserEmployment(user.employment);
        financePageThree.saveAndContinueButton.scrollIntoView(false);
        financePageThree.saveAndContinueButton.click();
        browser.pause(1000);
        browser.getUrl().should.contain('step-4');
    });

    it('I can complete page four of a finance application', () => {
        saveProgressDelay();

        checkFullPageScreen('FinancePageFour', financePageFour.snapshotOptions).should.equal(0);

        financePageFour.applyingWithoutCoApplicantInput.click();
        financePageFour.saveAndContinueButton.scrollIntoView(false);
        financePageFour.saveAndContinueButton.click();
        browser.pause(1000);
        browser.getUrl().should.contain('step-5');
    });

    it('I can successfully complete a finance application', () => {
        saveProgressDelay();

        checkFullPageScreen('FinancePageFive', financePageFive.snapshotOptions).should.equal(0);
    });
});
