import { register, arrangeTestSession, validatePageTitle, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import CCAPage from '../../../../v2/pages/checkout/estimator/ccaPage';
import StumpedPage from '../../../../v2/pages/checkout/estimator/stumpedPage';

describe('Estimator V2 ', () => {
  let checkoutPage: CheckoutPage = new CheckoutPage(1002);
  let tradeInPage: TradeInPage = new TradeInPage(1002);
  let stumpedPage: StumpedPage = new StumpedPage(1002);
  let ccaPage: CCAPage = new CCAPage(1002);
  let user: User = new User();

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
  it('Ensure that No, I am not trading in button is selected', () => {
      tradeInPage.iAmNotTradingInButton.click();
      browser.pause(1000);
      tradeInPage.saveAndcontinueButton.click();
      waitUntilUrlIncludes("finance");
      browser.pause(2000);
      checkoutPage.tradeInEstimateTile.click();
      waitUntilUrlIncludes("trade-in");
      tradeInPage.iAmNotTradingInButton.scrollIntoView();
      tradeInPage.iAmNotTradingInButton.getAttribute("class").should.contain("selected");
      browser.pause(2000);
  }); 
  it('ensure that Yes, I have a trade in button is preselected', () =>{
    tradeInPage.iLikeTradeInEstimateButton.click();
    tradeInPage.saveAndcontinueButton.click();
    browser.pause(2000);
    tradeInPage.iDoNotHaveATradeIn.click();
    waitUntilUrlIncludes("finance");
    checkoutPage.tradeInEstimateTile.click();
    waitUntilUrlIncludes("trade-in");
    tradeInPage.iAmNotTradingInButton.scrollIntoView();
    tradeInPage.iAmNotTradingInButton.getAttribute("class").should.contain("selected");
   });
});