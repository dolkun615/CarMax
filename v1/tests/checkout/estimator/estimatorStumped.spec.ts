import { register, arrangeTestSession, validatePageTitle } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';

describe('V1 Estimator, Stumped Page', () => {
  let checkoutPage: CheckoutPage = new CheckoutPage(1002);
  let tradeInPage: TradeInPage = new TradeInPage(1002);
  let user: User = new User();

  before(() => {
    console.log(`The current user under test is: ${user.userName}`);
    arrangeTestSession(RegisterPage.url);
    register(user, true);
    browser.url(checkoutPage.startProgressionUrl());
    checkoutPage.open();
    validatePageTitle(checkoutPage.title);
  });

  it('you have stumped our trade-in page with invalid License', () => {
    checkoutPage.estimateTaskCard.click();
    browser.pause(2000);
    tradeInPage.licensePlateInput.setValue('utnd5798');
    tradeInPage.stateInput.setValue('VA');
    tradeInPage.currentMileageInput.setValue('50000');
    tradeInPage.getMyEstimateButton.click();
    browser.pause(5000);
    tradeInPage.stumpedEstimatorHeader.getText().should.equal("You've stumped our trade-in estimator");
  });

  it('clicking skip_this_step_for_now_link redirects back to checkout hub', () => {
    tradeInPage.skipThisStepForNowLink.click();
    browser.pause(2000);
    checkoutPage.estimateTaskCard.isDisplayed().should.equal(true);
  });

  it('you have stumped our trade-in page', () => {
    checkoutPage.estimateTaskCard.click();
    browser.pause(2000);
    tradeInPage.vinButton.click();
    tradeInPage.vinNoField.setValue('ABY1Z4Z53FV278759');
    tradeInPage.currentMileageInput.setValue('99000');
    tradeInPage.getMyEstimateButton.click();
    browser.pause(5000);
    tradeInPage.stumpedEstimatorHeader.getText().should.equal("You've stumped our trade-in estimator");
  });
});
