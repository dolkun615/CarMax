import { register, arrangeTestSession, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import EstimatorResultPage from '../../../pages/checkout/estimator/estimatorResultPage';
import CCAPage from '../../../pages/checkout/estimator/ccaPage';

describe('Estimator V2, ', () => {
    const checkoutPage: CheckoutPage = new CheckoutPage(1002);
    const tradeInPage: TradeInPage = new TradeInPage(1002);
    const estimatorResultPage: EstimatorResultPage = new EstimatorResultPage(1002);
    const ccaPage: CCAPage = new CCAPage();
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
    it('it routes to Result page When using valid VIN No', () => {
        tradeInPage.iLikeTradeInEstimateButton.click();
        tradeInPage.saveAndcontinueButton.click();
        waitUntilUrlIncludes("trade-in");
        tradeInPage.vinButton.click();
        tradeInPage.vinNoField.setValue('WBY1Z4C53FV278751');
        tradeInPage.currentMileageInput.setValue('99000');
        tradeInPage.getMyEstimateButton.click();
        estimatorResultPage.estimatorResultPageHeaderText('Your CarMax estimate');
    });
    it('Complete Firm Trade-in offer', () => {
        estimatorResultPage.getPreApprovedButton.scrollIntoView();
        estimatorResultPage.getAFirmTradeInOfferButton.click();
        browser.pause(2000);

        if (ccaPage.beforeYouGetStartedInCCAPage.isExisting() &&
            ccaPage.beforeYouGetStartedInCCAPage.isDisplayed()) {
            ccaPage.getStartedButtonInCCAPage.click();
            browser.pause(2000);
        }
        ccaPage.vinOptionInCCAPage.click();
        ccaPage.vinFieldInCCAPage.setValue('WBY1Z4C53FV278751');
        ccaPage.lookUpVehicleButton.click();
        browser.pause(1000);
        ccaPage.transmissionTypeField.click();
        browser.pause(1000);
        ccaPage.transmissionType.click();
        browser.pause(1000);

        if (ccaPage.currentMilesFieldInCCAPage.isDisplayed()) {
            ccaPage.currentMilesFieldInCCAPage.setValue('99000');
            browser.pause(1000);
        }
        ccaPage.nextButton.click();
        browser.pause(2000);
        ccaPage.xIconInCCAPage.click();
        waitUntilUrlIncludes("finance");
        checkoutPage.tradeInEstimateTile.click();
        waitUntilUrlIncludes("trade-in");
        estimatorResultPage.ResultPageFirmTradeInOfferButtonUpdatedText('COMPLETE YOUR TRADE-IN INFO');
        estimatorResultPage.bannerInResultPage.click();
        browser.pause(2000);
        ccaPage.vehicleFeatureHeaderInCCAPage.getText().should.be.equal("Vehicle Features");
    });
});