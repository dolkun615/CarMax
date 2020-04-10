import { register, arrangeTestSession, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import EstimatorResultPage from 'pages/checkout/estimator/estimatorResultPage';

describe('Estimator V2,  ', () => {
    const checkoutPage: CheckoutPage = new CheckoutPage(1002);
    const tradeInPage: TradeInPage = new TradeInPage(1002);
    const estimatorResultPage: EstimatorResultPage = new EstimatorResultPage(1002);
    const user: User = new User();

    before(() => {
        console.log(`The current user under test is: ${user.userName}`);
        arrangeTestSession(RegisterPage.url);
        register(user);
        browser.url(checkoutPage.startProgressionUrl());
        checkoutPage.open();
        waitUntilUrlIncludes("vehicle-history");
        checkoutPage.saveAndContinueButton.click();
        waitUntilUrlIncludes("trade-in");
    });
    it('valid VIN No takes us to estimator result page', () => {
        tradeInPage.iLikeTradeInEstimateButton.click();
        tradeInPage.saveAndcontinueButton.click();
        waitUntilUrlIncludes("trade-in");
        tradeInPage.vinButton.click();
        tradeInPage.vinNoField.setValue('WBY1Z4C53FV278751');
        tradeInPage.currentMileageInput.setValue('99000');
        tradeInPage.getMyEstimateButton.click();
        estimatorResultPage.estimatorResultPageHeaderText('Your CarMax estimate');
    });
    it("Result Page Slider Automation", () => {
        estimatorResultPage.resultsPageHeader.scrollIntoView();
        browser.pause(1000);
        estimatorResultPage.resultPageSlider.dragAndDrop(estimatorResultPage.tradeInTowardsDownPaymentAmount);
        //it shows more than $8000 When slider moves to Max amount.  
        estimatorResultPage.tradeInTowardsDownPaymentAmount.getText().should.contain('$6');;
        browser.pause(1000);
        estimatorResultPage.resultPageSlider.dragAndDrop(estimatorResultPage.zeroAmount);
        estimatorResultPage.tradeInTowardsDownPaymentAmount.getText().should.equal('$250');
    });
});
