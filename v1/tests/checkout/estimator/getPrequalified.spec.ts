import { register, arrangeTestSession, validatePageTitle } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import EstimatorResultPage from '../../../pages/checkout/estimator/estimatorResultPage';
import FinancePageOne from '../../../pages/checkout/finance/financePageOne';

describe('V1 Estimator, Get Approved', () => {
    let checkoutPage: CheckoutPage = new CheckoutPage(1002);
    let tradeInPage: TradeInPage = new TradeInPage(1002);
    let estimatorResultPage: EstimatorResultPage = new EstimatorResultPage(1002);
    let financePageOne: FinancePageOne = new FinancePageOne(1002);
    let user: User = new User();

    before(() => {
        console.log(`The current user under test is: ${user.userName}`);
        arrangeTestSession(RegisterPage.url);
        register(user, true);
        browser.url(checkoutPage.startProgressionUrl());
        checkoutPage.open();
        validatePageTitle(checkoutPage.title);
    });

    it('Estimator with valid VIN and mileage', () => {
        checkoutPage.estimateTaskCard.click();
        browser.pause(2000);
        tradeInPage.vinButton.click();
        tradeInPage.vinNoField.setValue('WBY1Z4C53FV278751');
        tradeInPage.currentMileageInput.setValue('99000');
        tradeInPage.getMyEstimateButton.click();
        estimatorResultPage.estimatorResultPageHeaderText('Your CarMax estimate');
    });
    it('Sum of Down payment and Additional down payment', () => {
        let downPaymentNumber = estimatorResultPage.downPaymentAmount.getText();
        let amountInDownPayment: number = parseInt(downPaymentNumber.replace(/\D/g, ''));

        let additionalDownPaymentNumber = estimatorResultPage.additionalDownPaymentField.getValue(); 
        let additionalDwonPayment: number = parseInt(additionalDownPaymentNumber.replace(/\D/g, ''));

        let sumOfDownPaymentAndAdditionalDownPayment:number = amountInDownPayment + additionalDwonPayment;
         
        estimatorResultPage.getPreApprovedButton.click();
        browser.pause(3000);
         
        let financePageDownPayment = financePageOne.downPaymentAmountInFinancePage.getValue();
        let downPaymentInFinancePage : number = parseInt(financePageDownPayment.replace(/\D/g, ''));
         
        sumOfDownPaymentAndAdditionalDownPayment.should.equal(downPaymentInFinancePage);
    });
});