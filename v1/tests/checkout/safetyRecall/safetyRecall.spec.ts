import { register, arrangeTestSession, validatePageTitle, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';

describe('V1 Vehicle Safety Recall', () => {
    let checkoutPage: CheckoutPage = new CheckoutPage(1002);
    let user: User = new User();

    before(() => {
        console.log(`The current user under test is: ${user.userName}`);
        arrangeTestSession(RegisterPage.url);
        register(user, true);
        browser.url(checkoutPage.startProgressionUrl());
        checkoutPage.open();
        validatePageTitle(checkoutPage.title);
    });
    it('NHTSA page opens in a new tab after clicking safety Recall task card', () => {
        checkoutPage.safetyRecallTaskCard.click();
        browser.pause(2000);
        browser.switchWindow('.*Check for Recalls.*');
        waitUntilUrlIncludes("nhtsa");
        waitUntilUrlIncludes("recalls");
        
    });

    it('Safety recall task card updates with completed', () => {
        browser.switchWindow('.*Checkout.*');
        browser.pause(2000);
        checkoutPage.safetyRecallCompletedText.getText().should.equal('COMPLETED');
    });
});
