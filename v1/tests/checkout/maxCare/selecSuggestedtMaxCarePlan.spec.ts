import MaxCarePage from '../../../pages/checkout/maxcare/maxcare';
import { register, arrangeTestSession, validatePageTitle, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';

describe('V1 MaxCare, Select Suggested MaxCare', () => {
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

    it('Select Suggested MaxCare plan', () => {
        checkoutPage.maxCareTaskCard.click();
        waitUntilUrlIncludes('maxcare');
        maxcarePage.continueToMaxCarePlanButton.click();
        browser.pause(3000);
        maxcarePage.averageMilesOption.click();
        browser.pause(1000);
        maxcarePage.seeSuggestedMaxCarePlanButton.click();
        browser.pause(1000);
        maxcarePage.firstSuggestedMaxCarePlan.click();
        browser.pause(2000);
        maxcarePage.selectMaxCarePlanButton.click();
        checkoutPage.maxcareTaskCardUpdatedText('COMPLETED');
    });
});
