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

    it('Slider for Car Ownership years', () => {
        checkoutPage.maxCareTaskCard.click();
        waitUntilUrlIncludes('maxcare');
        maxcarePage.continueToMaxCarePlanButton.click();
        browser.pause(2000);
        maxcarePage.maxcareSliderDynamicYearNumberValidation('4'); //default year is 4
        maxcarePage.yearSliderInMaxCarePage.dragAndDrop(maxcarePage.defaultYearsFivePlus);
        browser.pause(500);
        maxcarePage.maxcareSliderDynamicYearNumberValidation('5+');
        browser.pause(500);
        maxcarePage.yearSliderInMaxCarePage.dragAndDrop(maxcarePage.defaulYearOne);
        browser.pause(500);
        maxcarePage.maxcareSliderDynamicYearNumberValidation('1');
    });
});
