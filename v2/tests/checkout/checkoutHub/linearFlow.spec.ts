import { register, arrangeTestSession, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import MaxcarePage from '../../../pages/checkout/maxCare/maxcare';

describe('CheckoutHub V2 ', () => {
    const checkoutPage: CheckoutPage = new CheckoutPage(1002);
    const tradeInPage: TradeInPage = new TradeInPage(1002);
    const maxCarePage: MaxcarePage = new MaxcarePage(1002);
    const user: User = new User();

    before(() => {
        console.log(`The current user under test is: ${user.userName}`);
        arrangeTestSession(RegisterPage.url);
        register(user);
        browser.url(checkoutPage.startProgressionUrl());
        checkoutPage.open();
        waitUntilUrlIncludes("vehicle-history");
    });
    it('The Linear Flow ', () => {
        checkoutPage.saveAndContinueButton.click();
        waitUntilUrlIncludes("trade-in");
        browser.pause(1000);
        tradeInPage.iAmNotTradingInButton.click();
        tradeInPage.saveAndcontinueButton.click();
        waitUntilUrlIncludes("finance");
        browser.pause(1000);
        checkoutPage.payCashTile.click();
        checkoutPage.continueButton.click();
        waitUntilUrlIncludes("maxcare");
        browser.pause(1000);
        maxCarePage.IAmNotInterestedButton.click();
        waitUntilUrlIncludes("summary");
    });
});