import { register, arrangeTestSession, validatePageTitle } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import EstimatorResultPage from '../../../pages/checkout/estimator/estimatorResultPage';
import CCAPage from '../../../pages/checkout/estimator/ccaPage';

describe('V1 Estimator, Preferred Term Length', () => {
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
  it('validate preferred term length options', () => {
     estimatorResultPage.preferredTermLengthField.click();
     browser.pause(1000);
     estimatorResultPage.sixtyMonths.click();
     estimatorResultPage.preferredTermLengthFieldInSummary.getText().should.equal('60 mo.');

     estimatorResultPage.sixtyMonths.click();
     browser.pause(1000);
     estimatorResultPage.fortyEightMonths.click();
     estimatorResultPage.preferredTermLengthFieldInSummary.getText().should.equal('48 mo.');

     estimatorResultPage.fortyEightMonths.click();
     browser.pause(1000);
     estimatorResultPage.thirtySixMonths.click();
     estimatorResultPage.preferredTermLengthFieldInSummary.getText().should.equal('36 mo.');
  });
}); 