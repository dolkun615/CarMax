import { register, arrangeTestSession, validatePageTitle, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import EstimatorResultPage from '../../../pages/checkout/estimator/estimatorResultPage';
import PaymentMethodPage from 'pages/checkout/finance/paymentMethod';

describe('V1 Finance Options ', () => {
    let checkoutPage: CheckoutPage = new CheckoutPage(1002);
    let tradeInPage: TradeInPage = new TradeInPage(1002);
    let estimatorResultPage: EstimatorResultPage = new EstimatorResultPage(1002);
    let paymentMethodPage : PaymentMethodPage = new PaymentMethodPage(1002);
    let user: User = new User();
 
    before(() => {
        console.log(`The current user under test is: ${user.userName}`);
        arrangeTestSession(RegisterPage.url);
        register(user, true);
        browser.url(checkoutPage.startProgressionUrl());
        checkoutPage.open();
        validatePageTitle(checkoutPage.title);
    });

    it('Financing ElseWhere', () => {
        checkoutPage.choosePaymentMethodCard.click();
        waitUntilUrlIncludes('finance');
        paymentMethodPage.financeElsewhereTile.click();
        browser.pause(1000);
        paymentMethodPage.continueButton.click();
        checkoutPage.financeTaskCardFinancingElseWhereText('I will be financing elsewhere.');
    });
});