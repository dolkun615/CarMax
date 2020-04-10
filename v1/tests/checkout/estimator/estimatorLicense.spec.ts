import { register, arrangeTestSession, validatePageTitle } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import EstimatorResultPage from '../../../pages/checkout/estimator/estimatorResultPage';

describe('V1 Estimator, Valid License', () => {
    let checkoutPage: CheckoutPage = new CheckoutPage(1002);
    let tradeInPage: TradeInPage = new TradeInPage(1002);
    let estimatorResultPage: EstimatorResultPage = new EstimatorResultPage(1002);
    let user: User = new User();
 
    before(() => {
        console.log(`The current user under test is: ${user.userName}`);
        arrangeTestSession(RegisterPage.url);
        register(user, true);
        browser.url(checkoutPage.startProgressionUrl());
        checkoutPage.open();
        validatePageTitle(checkoutPage.title);
    });

    it('TRADE-IN STILL AVAILABLE text should be displayed when I do not have a trade in', () => {
        checkoutPage.estimateTaskCard.click();
        browser.pause(1000);
        tradeInPage.iDontHaveATradeInButton.click();
        browser.pause(2000);
    });

    it('The Estimator returns a value when using a valid license plate', () => {
        checkoutPage.estimateTaskCard.click();

        // There is some CSS Transition weirdness here
        // possible solutions suggested here: https://github.com/webdriverio/webdriverio/issues/3106
        // I think this is probably happening all over where the Slidey container is used.
        tradeInPage.licensePlateInput.waitForDisplayed();
        tradeInPage.licensePlateInput.setValue('HAPILEE');
        tradeInPage.stateInput.setValue('VA');
        tradeInPage.currentMileageInput.setValue('99000');
        tradeInPage.getMyEstimateButton.click();
        estimatorResultPage.estimatorResultPageHeaderText('Your CarMax estimate');
    });
});
