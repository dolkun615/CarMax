import { register, arrangeTestSession, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';

describe('Safety Recall V2', () => {
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
    it.only('NHTSA page opens in new tab after clicking safety Recall link', () => {
        checkoutPage.nhtsaLink.click();
        browser.pause(2000);
        browser.switchWindow('.*Check for Recalls.*');
        waitUntilUrlIncludes("nhtsa");
        waitUntilUrlIncludes("recalls");
    });
});
