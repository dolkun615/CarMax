import MaxCarePage from '../../../pages/checkout/maxcare/maxcare';
import { register, arrangeTestSession, validatePageTitle, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';

describe('V1 MaxCare, Not Interested in MaxCare', () => {
  let checkoutPage: CheckoutPage = new CheckoutPage(1002);
  let maxcarePage: MaxCarePage = new MaxCarePage(1002);
  let user: User = new User();

  before(() => {
    console.log(`The current user under test is: ${user.userName}`);
    arrangeTestSession(RegisterPage.url);
    register(user, true);
    browser.url(checkoutPage.startProgressionUrl());
    checkoutPage.open();
    validatePageTitle(checkoutPage.title);
  });

  it('Not Interested In MaxCare Plan', () => {
    checkoutPage.maxCareTaskCard.click();
    waitUntilUrlIncludes('maxcare');
    maxcarePage.IAmNotInterestedButton.click();
    checkoutPage.maxcareIChoseNotToAddServicePlan('I chose not to add a service plan.');
  });
   
});
