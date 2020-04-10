import { register, arrangeTestSession, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import PaymentMethodPage from '../../../pages/checkout/finance/paymentMethod';
import FinancePageOne from '../../../pages/checkout/finance/financePageOne';

describe('Finance Options V2, ', () => {
    const checkoutPage: CheckoutPage = new CheckoutPage(1002);
    const tradeInPage: TradeInPage = new TradeInPage(1002);
    const paymentMethodPage: PaymentMethodPage = new PaymentMethodPage(1002);
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
        tradeInPage.iAmNotTradingInButton.click();
        tradeInPage.saveAndcontinueButton.click();
        waitUntilUrlIncludes("finance");
    });
    it('Finance With CarMax button preselected', () => {
        paymentMethodPage.financeWithCarMaxTile.click();
        browser.pause(1000);
        paymentMethodPage.saveAndContinueButton.click();        
        browser.pause(3000);        
        financePageOne.weWillStartWithYourDownPaymentText.getText().should.contain("start with your down payment");
        financePageOne.backLink.scrollIntoView();
        paymentMethodPage.backLink.click();
        browser.pause(2000);
        paymentMethodPage.financeWithCarMaxTile.getAttribute("class").should.contain("selected");
    });
});








