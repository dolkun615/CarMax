import { register, arrangeTestSession, checkFullPageScreen, checkScreen } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import CheckoutPage from '../../../pages/checkout/checkout';
import SnapshotUser from '../../../../data/snapshotUser';

describe('Estimator Page Snapshot Tests', () => {
    const checkoutPage: CheckoutPage = new CheckoutPage(1002);
    const tradeInPage: TradeInPage = new TradeInPage(1002)
    const user: SnapshotUser = new SnapshotUser();

    before(() => {
        console.log(`The current user under test is: ${user.userName}`);
        arrangeTestSession(RegisterPage.url);
        register(user);
        browser.url(checkoutPage.startProgressionUrl());
        checkoutPage.open();
        checkoutPage.tradeInEstimateTile.click();
    });
    it('Estimator page is the same as the baseline', () => {
        browser.pause(2000);

        checkScreen('EstimatorPage', tradeInPage.snapshotOptions).should.equal(0);

        tradeInPage.licensePlateInput.waitForDisplayed();
        tradeInPage.licensePlateInput.setValue('HAPILEE');
        tradeInPage.stateInput.setValue('VA');
        tradeInPage.currentMileageInput.setValue('99000');
    });
    it('Estimate Results Page is the same as the baseline', () => {
        tradeInPage.getMyEstimateButton.click();
        browser.pause(30000);

        const options = tradeInPage.snapshotOptions;
        options.hideElements.push(tradeInPage.drawer);
        options.hideElements.push(tradeInPage.evoxImage);

        checkFullPageScreen('EstimateResultsPage', options).should.equal(0);
    });
});
