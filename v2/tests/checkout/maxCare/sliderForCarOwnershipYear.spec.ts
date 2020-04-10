import MaxCarePage from '../../../pages/checkout/maxcare/maxcare';
import { register, arrangeTestSession, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import PaymentMethodPage from '../../../pages/checkout/finance/paymentMethod';

describe('MaxCare Slider V2, ', () => {
    const checkoutPage: CheckoutPage = new CheckoutPage(1002);
    const maxcarePage: MaxCarePage = new MaxCarePage(1002);
    const tradeInPage: TradeInPage = new TradeInPage(1002);
    const paymentMethod: PaymentMethodPage = new PaymentMethodPage(1002);
    const user: User = new User();

    before(() => {
        console.log(`The current user under test is: ${user.userName}`);
        arrangeTestSession(RegisterPage.url);
        register(user);
        browser.url(checkoutPage.startProgressionUrl());
        checkoutPage.open();
        waitUntilUrlIncludes("vehicle-history");
    });
    it('I can route to maxCare Page', () => {
        checkoutPage.saveAndContinueButton.click();
        waitUntilUrlIncludes("trade-in");
        tradeInPage.iAmNotTradingInButton.click();
        tradeInPage.saveAndcontinueButton.click();
        waitUntilUrlIncludes("finance");
        paymentMethod.financeElseWhereTile.click();
        paymentMethod.saveAndContinueButton.click();
        waitUntilUrlIncludes('maxcare');
    });
    it('Slider for Car Ownership years', () => {
        maxcarePage.viewMaxCarePlanLink.click();
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
