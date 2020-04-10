import { register, arrangeTestSession, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import CCAPage from '../../../../v2/pages/checkout/estimator/ccaPage';
import StumpedPage from '../../../../v2/pages/checkout/estimator/stumpedPage';

describe('Estimator V2 ', () => {
    const checkoutPage: CheckoutPage = new CheckoutPage(1002);
    const tradeInPage: TradeInPage = new TradeInPage(1002);
    const stumpedPage: StumpedPage = new StumpedPage(1002);
    const ccaPage: CCAPage = new CCAPage(1002);
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
    it('you have stumped our trade-in page with invalid License', () => {
        tradeInPage.iLikeTradeInEstimateButton.click();
        tradeInPage.saveAndcontinueButton.click();
        waitUntilUrlIncludes("trade-in");
        browser.pause(1000);
        tradeInPage.feedbackLinkIsDisplayed();
        tradeInPage.licensePlateInput.setValue('utnd579800');
        tradeInPage.stateInput.setValue('VA');
        tradeInPage.currentMileageInput.setValue('99000');
        tradeInPage.getMyEstimateButton.click();
        stumpedPage.stumpedEstimatorHeader.waitForDisplayed(15000);
        stumpedPage.stumpedEstimatorHeader.getText().should.equal("You've stumped our trade-in estimator");
        browser.pause(1000);
        stumpedPage.feedbackLinkIsDisplayed();
    });
    it('clicking skip_this_step_for_now_link redirects back to checkout hub', () => {
        stumpedPage.skipThisStepForNowLink.click();
        browser.pause(2000);
        waitUntilUrlIncludes("finance");
    });
    it("Ensure that I'm Not trading-in button is Preselected", () => {
        checkoutPage.tradeInEstimateTile.click();
        waitUntilUrlIncludes("trade-in");
    });
    it('you have stumped our trade-in page', () => {
        tradeInPage.iLikeTradeInEstimateButton.click();
        tradeInPage.saveAndcontinueButton.click();
        waitUntilUrlIncludes("trade-in");
        tradeInPage.vinButton.click();
        tradeInPage.vinNoField.setValue('ABY1Z4Z53FV278759');
        tradeInPage.currentMileageInput.setValue('99000');
        tradeInPage.getMyEstimateButton.click();
        stumpedPage.stumpedEstimatorHeader.waitForDisplayed(15000);
        stumpedPage.stumpedEstimatorHeader.getText().should.equal("You've stumped our trade-in estimator");
        stumpedPage.startFullOnlineAppraisalButton.click();
        browser.pause(3000);
        ccaPage.getStartedButtonInCCAPage.isDisplayed().should.be.true;
    });
});
