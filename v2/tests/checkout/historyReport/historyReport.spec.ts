import { arrangeTestSession, register, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';

describe('Vehicle History Report V2', () => {
    const stockNumber = 1002;
    const checkoutPage: CheckoutPage = new CheckoutPage(stockNumber);
    const user: User = new User();

    before(() => {
        console.log(`The current user under test is: ${user.userName}`);
        arrangeTestSession(RegisterPage.url);
        register(user);
        browser.url(checkoutPage.startProgressionUrl());
        checkoutPage.open();
        waitUntilUrlIncludes("vehicle-history");
    });
    it.only('clicking view full report button routes to History report page', () => {
        checkoutPage.viewFullReportButton.click();
        browser.pause(3000);
        browser.switchWindow('.*Vehicle History Report.*');
        browser.getUrl().should.contain(`${stockNumber}`);
        browser.getUrl().should.contain('history');
    });
});
