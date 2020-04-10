import MaxCarePage from '../../../pages/checkout/maxcare/maxcare';
import { register, arrangeTestSession, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import PaymentMethodPage from '../../../pages/checkout/finance/paymentMethod';

describe('MaxCare V2', () => {
    const checkoutPage: CheckoutPage = new CheckoutPage(1002);
    const maxcarePage: MaxCarePage = new MaxCarePage(1002);
    const tradeInPage: TradeInPage = new TradeInPage(1002);
    const paymentMethod: PaymentMethodPage = new PaymentMethodPage(1002);
    const user: User = new User();

    before(() => {
        console.log(`The current user under test is: ${user.userName}`);
        arrangeTestSession(RegisterPage.url);
        register(user);
        browser.url(checkoutPage.startProgressionUrl());
        checkoutPage.open();
        waitUntilUrlIncludes("vehicle-history");
        browser.pause(1000);
        checkoutPage.feedbackLinkIsDisplayed();
    });
    it('I can route to maxCare Page', () => {
        checkoutPage.saveAndContinueButton.click();
        waitUntilUrlIncludes("trade-in");
        tradeInPage.feedbackLinkIsDisplayed();
        tradeInPage.iAmNotTradingInButton.click();
        tradeInPage.saveAndcontinueButton.click();
        waitUntilUrlIncludes("finance");
        paymentMethod.feedbackLinkIsDisplayed();
        paymentMethod.financeElseWhereTile.click();
        paymentMethod.saveAndContinueButton.click();
        waitUntilUrlIncludes('maxcare');
        maxcarePage.feedbackLinkIsDisplayed();
    });
    it('Select Suggested MaxCare plan routes to completion page', () => {
        maxcarePage.viewMaxCarePlanLink.click();
        browser.pause(1000);
        maxcarePage.feedbackLinkIsDisplayed();
        maxcarePage.averageMilesOption.click();
        browser.pause(1000);
        maxcarePage.seeSuggestedMaxCarePlanButton.click();
        browser.pause(1000);
        maxcarePage.feedbackLinkIsDisplayed();
        maxcarePage.firstSuggestedMaxCarePlan.click();
        maxcarePage.saveAndContinue.click();
        browser.pause(2000);
        maxcarePage.niceWorkText.getText().should.be.equal("Nice work");
        maxcarePage.feedbackLinkIsDisplayed();
    });
});
