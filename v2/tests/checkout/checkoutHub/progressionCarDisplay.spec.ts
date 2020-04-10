import { register, arrangeTestSession, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';

describe('CheckoutHub V2, ', () => {
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
    it('Clicking arrow button should display the progressed car', () => {
        checkoutPage.arrowButtonInCheckOutHub.click();
        browser.pause(1000);
        checkoutPage.viewVehicleDetailsLink.isDisplayed().should.be.true;
    });
    it('Clicking View Vehicle details link routes to Car page', () => {
        checkoutPage.viewVehicleDetailsLink.click();
        browser.pause(1000);
        browser.switchWindow(".*Maryland | CarMax.*");
        browser.pause(1000);
        checkoutPage.estimatePaymentLinkInHomePage.isDisplayed().should.be.true;
    });
});
