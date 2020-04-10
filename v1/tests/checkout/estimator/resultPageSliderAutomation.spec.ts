import { register, arrangeTestSession, validatePageTitle } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import EstimatorResultPage from 'pages/checkout/estimator/estimatorResultPage';

describe('V1 Estimator,  ', () => {
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
  it('valid VIN No takes us to estimator result page', () => {
    checkoutPage.estimateTaskCard.click();
    browser.pause(2000);
    tradeInPage.vinButton.click();
    tradeInPage.vinNoField.setValue('WBY1Z4C53FV278751');
    tradeInPage.currentMileageInput.setValue('99000');
    tradeInPage.getMyEstimateButton.click();
    estimatorResultPage.estimatorResultPageHeaderText('Your CarMax estimate');
  });
  it("Result Page Slider Automation", () => {     
     estimatorResultPage.resultsPageHeader.scrollIntoView();
     browser.pause(1000);
     estimatorResultPage.resultPageSlider.dragAndDrop(estimatorResultPage.tradeInTowardsDownPaymentAmount);
     browser.pause(1000);
     estimatorResultPage.tradeInTowardsDownPaymentAmount.getText().should.contain('$ 6');
     browser.pause(1000);
     estimatorResultPage.resultPageSlider.dragAndDrop(estimatorResultPage.minimumAmount);
     estimatorResultPage.tradeInTowardsDownPaymentAmount.getText().should.equal('$ 250');   
  });
});
