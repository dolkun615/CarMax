import { register, arrangeTestSession, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';

describe('CheckoutHub V2 ', () => {
    const checkoutPage: CheckoutPage = new CheckoutPage(1002);
    const user: User = new User();

    before(() => {
        console.log(`The current user under test is: ${user.userName}`);
        arrangeTestSession(RegisterPage.url);
        register(user);
        browser.url(checkoutPage.startProgressionUrl());
        checkoutPage.open();
        waitUntilUrlIncludes("vehicle-history");
    });
    it('Clicking CarMax Logo routes back to Home Page', () => {
        //this is the link that we need to click
        checkoutPage.carMaxLogo.click();
        browser.pause(2000);
        checkoutPage.findYourCarButtonInHomePage.isDisplayed().should.be.true;
        browser.back();
        waitUntilUrlIncludes("vehicle-history");
    });
    it('Clicking carmax.com routes Back to Home Page', () => {
        checkoutPage.exitToCarMaxLink.click();
        browser.pause(2000);
        checkoutPage.findYourCarButtonInHomePage.isDisplayed().should.be.true;
    });
});
