import MaxCarePage from '../../../pages/checkout/maxcare/maxcare';
import { register, arrangeTestSession, checkFullPageScreen } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';

describe('MaxCare Page, ', () => {
    const checkoutPage: CheckoutPage = new CheckoutPage(1002);
    const maxcarePage: MaxCarePage = new MaxCarePage(1002);
    const user: User = new User();

    before(() => {
        console.log(`The current user under test is: ${user.userName}`);
        arrangeTestSession(RegisterPage.url);
        register(user);
        browser.url(checkoutPage.startProgressionUrl());
        checkoutPage.open();
        browser.pause(2000);
    });
    it('MaxCare Overview page is the same as the baseline', () => {
        checkoutPage.optionalServicePlanMenuItem.click();
        browser.pause(2000);

        checkFullPageScreen('MaxCareOverview', maxcarePage.snapshotOptions).should.equal(0);
    });
    it('MaxCare Options page is the same as the baseline', () => {
        maxcarePage.continueToMaxCarePlanButton.scrollIntoView(false);
        maxcarePage.continueToMaxCarePlanButton.click();
        browser.pause(2000);

        checkFullPageScreen('MaxCareOptions', maxcarePage.snapshotOptions).should.equal(0);
    });
    it('MaxCare Plans page is the same as the baseline', () => {
        maxcarePage.averageMilesOption.scrollIntoView(false);
        maxcarePage.averageMilesOption.click();
        maxcarePage.seeSuggestedMaxCarePlanButton.scrollIntoView(false);
        maxcarePage.seeSuggestedMaxCarePlanButton.click();
        browser.pause(2000);

        checkFullPageScreen('MaxCarePlans', maxcarePage.snapshotOptions).should.equal(0);
    });
});
