import { register, arrangeTestSession, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import EstimatorResultPage from '../../../pages/checkout/estimator/estimatorResultPage';

describe('Estimator V2', () => {
    const checkoutPage: CheckoutPage = new CheckoutPage(1002);
    const tradeInPage: TradeInPage = new TradeInPage(1002);
    const estimatorResultPage: EstimatorResultPage = new EstimatorResultPage(1002);
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
        checkoutPage.saveAndContinueButton.click();
        waitUntilUrlIncludes("trade-in");
        browser.pause(1000);
        tradeInPage.feedbackLinkIsDisplayed();
    });
    it('TRADE-IN STILL AVAILABLE text should be displayed when I do not have a trade in', () => {
        tradeInPage.iAmNotTradingInButton.click();
        browser.pause(1000);
        tradeInPage.saveAndcontinueButton.click();
        waitUntilUrlIncludes("finance");
    });
    it('I Do Not have a trade in link routes to finance options page', () => {
        checkoutPage.tradeInEstimateTile.click();
        tradeInPage.iLikeTradeInEstimateButton.click();
        tradeInPage.saveAndcontinueButton.click();
        waitUntilUrlIncludes("trade-in");
        browser.pause(1000);
        tradeInPage.feedbackLinkIsDisplayed();
        tradeInPage.iDoNotHaveATradeIn.click();
        waitUntilUrlIncludes("finance");
    });
    it('Estimator routes to result page when using valid license plate', () => {
        checkoutPage.tradeInEstimateTile.click();
        waitUntilUrlIncludes("trade-in");
        tradeInPage.iLikeTradeInEstimateButton.click();
        tradeInPage.saveAndcontinueButton.click();
        tradeInPage.licensePlateInput.waitForDisplayed();
        tradeInPage.feedbackLinkIsDisplayed();
        tradeInPage.licensePlateInput.setValue('HAPILEE');
        tradeInPage.stateInput.setValue('VA');
        tradeInPage.currentMileageInput.setValue('99000');
        tradeInPage.getMyEstimateButton.click();
        estimatorResultPage.resultsPageHeader.waitForDisplayed(15000);
        estimatorResultPage.resultsPageHeader.getText().should.equal("Your CarMax estimate");
        browser.pause(1000);
        estimatorResultPage.feedbackLinkIsDisplayed();
    });
});
