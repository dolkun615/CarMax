import { register, arrangeTestSession, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import PaymentMethodPage from '../../../pages/checkout/finance/paymentMethod';

describe('Finance Options V2, ', () => {
    const checkoutPage: CheckoutPage = new CheckoutPage(1002);
    const tradeInPage: TradeInPage = new TradeInPage(1002);
    const paymentMethodPage: PaymentMethodPage = new PaymentMethodPage(1002);
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
    it('Paying Cash button is preselected', () => {
        paymentMethodPage.payCashTile.click();
        browser.pause(1000);
        paymentMethodPage.saveAndContinueButton.click();
        browser.pause(1000);
        waitUntilUrlIncludes("maxcare");
        checkoutPage.paymentOptionMenuItem.click();
        browser.pause(1000);
        waitUntilUrlIncludes("finance");
        paymentMethodPage.payCashTile.getAttribute("class").should.contain("selected");
    });
});








