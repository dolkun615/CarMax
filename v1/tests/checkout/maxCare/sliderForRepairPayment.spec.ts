import MaxCarePage from '../../../pages/checkout/maxcare/maxcare';
import { register, arrangeTestSession, validatePageTitle, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';

describe('V1 MaxCare Slider, ', () => {
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

    it('Slider for Repair payment amount', () => {
        checkoutPage.maxCareTaskCard.click();
        waitUntilUrlIncludes('maxcare');
        maxcarePage.continueToMaxCarePlanButton.click();
        browser.pause(2000);
        maxcarePage.maxcareSliderDynamicAmountValidation('$700'); //default amount is $700
        browser.pause(500);
        maxcarePage.payingRepairSliderInMaxCarePage.dragAndDrop(maxcarePage.defaultAmountDollarNiveHundredPlus);
        browser.pause(500);
        maxcarePage.maxcareSliderDynamicAmountValidation('$875');
        maxcarePage.payingRepairSliderInMaxCarePage.dragAndDrop(maxcarePage.defaultAmountDollarFifty);
        browser.pause(500);
        maxcarePage.maxcareSliderDynamicAmountValidation('$75');
    });
});
