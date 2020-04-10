import { register, arrangeTestSession, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import EstimatorResultPage from '../../../pages/checkout/estimator/estimatorResultPage';
import FinancePageOne from '../../../pages/checkout/finance/financePageOne';

describe('Estimator V2, ', () => {
    const checkoutPage: CheckoutPage = new CheckoutPage(1002);
    const tradeInPage: TradeInPage = new TradeInPage(1002);
    const estimatorResultPage: EstimatorResultPage = new EstimatorResultPage(1002);
    const financePageOne: FinancePageOne = new FinancePageOne(1002);
    const user: User = new User();

    before(() => {
        console.log(`The current user under test is: ${user.userName}`);
        arrangeTestSession(RegisterPage.url);
        register(user);
        browser.url(checkoutPage.startProgressionUrl());
        checkoutPage.open();
        waitUntilUrlIncludes("vehicle-history");
        checkoutPage.saveAndContinueButton.click();
        waitUntilUrlIncludes("trade-in");
    });
    it('Estimator with valid VIN and mileage', () => {
        tradeInPage.iLikeTradeInEstimateButton.click();
        tradeInPage.saveAndcontinueButton.click();
        waitUntilUrlIncludes("trade-in");
        tradeInPage.vinButton.click();
        tradeInPage.vinNoField.setValue('WBY1Z4C53FV278751');
        tradeInPage.currentMileageInput.setValue('99000');
        tradeInPage.getMyEstimateButton.click();
        estimatorResultPage.estimatorResultPageHeaderText('Your CarMax estimate');
    });
    it('Sum of Trade-in Amount and Additional down payment', () => {
        const downPaymentNumber = estimatorResultPage.tradeInAmount.getText();
        const amountInDownPayment: number = parseInt(downPaymentNumber.replace(/\D/g, ''));

        const additionalDownPaymentNumber = estimatorResultPage.additionalDownPaymentField.getText();
        const additionalDwonPayment: number = parseInt(additionalDownPaymentNumber.replace(/\D/g, ''));

        const sumOfDownPaymentAndAdditionalDownPayment: number = amountInDownPayment + additionalDwonPayment;

        estimatorResultPage.getPreApprovedButton.click();
        waitUntilUrlIncludes("finance");

        const financePageDownPayment = financePageOne.downPaymentAmountInFinancePage.getValue();
        const downPaymentInFinancePage: number = parseInt(financePageDownPayment.replace(/\D/g, ''));
        browser.pause(1000);
        sumOfDownPaymentAndAdditionalDownPayment.should.equal(downPaymentInFinancePage);

        checkoutPage.tradeInEstimateTile.click();
        waitUntilUrlIncludes("trade-in/estimate");
        estimatorResultPage.additionalDownPaymentField.scrollIntoView();
        browser.pause(1000);
        estimatorResultPage.IAmNotFinancingWithCarMax.isDisplayed().should.be.true;
        estimatorResultPage.IAmNotFinancingWithCarMax.getText().should.be.equal("I'M NOT FINANCING WITH CARMAX");
    });
});