import { register, arrangeTestSession, validatePageTitle, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import EstimatorResultPage from 'pages/checkout/estimator/estimatorResultPage';

describe('V1 Estimator, Not Financing With CarMax', () => {
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
  it('The Estimator returns a value when using a valid VIN No', () => {
    checkoutPage.estimateTaskCard.click();
    browser.pause(2000);
    tradeInPage.vinButton.click();
    tradeInPage.vinNoField.setValue('WBY1Z4C53FV278751');
    tradeInPage.currentMileageInput.setValue('99000');
    tradeInPage.getMyEstimateButton.click();
    estimatorResultPage.estimatorResultPageHeaderText('Your CarMax estimate');
  });
  it("Not financing with CarMax link takes to finance options page", () => {
    estimatorResultPage.IAmNotFinancingWithCarMax.click();
    browser.pause(2000);
    waitUntilUrlIncludes("finance");
  });
});
