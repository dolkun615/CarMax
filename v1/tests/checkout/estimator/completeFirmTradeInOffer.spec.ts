import { register, arrangeTestSession, validatePageTitle, } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import EstimatorResultPage from '../../../pages/checkout/estimator/estimatorResultPage';
import CCAPage from '../../../pages/checkout/estimator/ccaPage';

describe('V1 Estimator, ', () => {
  let checkoutPage: CheckoutPage = new CheckoutPage(1002);
  let tradeInPage: TradeInPage = new TradeInPage(1002);
  let estimatorResultPage: EstimatorResultPage = new EstimatorResultPage(1002);
  let ccaPage: CCAPage = new CCAPage();
  let user: User = new User();

  before(() => {
    console.log(`The current user under test is: ${user.userName}`);
    arrangeTestSession(RegisterPage.url);
    register(user, true);
    browser.url(checkoutPage.startProgressionUrl());
    checkoutPage.open();
    validatePageTitle(checkoutPage.title);
  });
  it('The Estimator returns a value when using a valid VIN No', () => {
    checkoutPage.estimateTaskCard.click();
    tradeInPage.vinButton.waitForDisplayed();
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
    
     if(ccaPage.beforeYouGetStartedInCCAPage.isExisting() &&
      ccaPage.beforeYouGetStartedInCCAPage.isDisplayed()){
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
    
    if(ccaPage.currentMilesFieldInCCAPage.isDisplayed()){
      ccaPage.currentMilesFieldInCCAPage.setValue('99000');
      browser.pause(1000);
    }
    ccaPage.nextButton.click();
    browser.pause(2000);
    ccaPage.xIconInCCAPage.click();
    browser.pause(2000);
    checkoutPage.estimateTaskCard.click();
    browser.pause(2000);
    estimatorResultPage.getPreApprovedButton.scrollIntoView();
    estimatorResultPage.ResultPageFirmTradeInOfferButtonUpdatedText('COMPLETE YOUR TRADE-IN INFO');
  });
});