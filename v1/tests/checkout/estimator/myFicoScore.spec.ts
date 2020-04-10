import { register, arrangeTestSession, validatePageTitle } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import EstimatorResultPage from '../../../pages/checkout/estimator/estimatorResultPage';

describe('V1 Estimator, Fico Score Validation', () => {
    let checkoutPage: CheckoutPage = new CheckoutPage(1002);
    let tradeInPage: TradeInPage = new TradeInPage(1002);
    let estimatorResultPage: EstimatorResultPage = new EstimatorResultPage(1002);
    let user: User = new User();

    before(() => {
        console.log(`The current user under test is: ${user.userName}`);
        arrangeTestSession(RegisterPage.url);
        register(user, true);
        browser.url(checkoutPage.startProgressionUrl());
        checkoutPage.open();
        validatePageTitle(checkoutPage.title);
    });

    it('Estimator with valid VIN and mileage', () => {
        checkoutPage.estimateTaskCard.click();
        browser.pause(2000);
        tradeInPage.vinButton.click();
        tradeInPage.vinNoField.setValue('WBY1Z4C53FV278751');
        tradeInPage.currentMileageInput.setValue('99000');
        tradeInPage.getMyEstimateButton.click();
        estimatorResultPage.estimatorResultPageHeaderText('Your CarMax estimate');
    });
    it('Fico Score validation against APR', () =>{
        estimatorResultPage.downPaymentAmount.scrollIntoView();
        browser.pause(1000);
        
        const list: string[] = ["Excellent", "Very Good", "Fair", "Challenged"];

        for(let item of list){
            estimatorResultPage.selectFicoScore(item);
            let apr = estimatorResultPage.getAPR(item);
            estimatorResultPage.aprField.getValue().should.equal(apr);
            let aprInCulculatorSection = estimatorResultPage.aprField.getValue();
            let aprInSummarySection =  estimatorResultPage.aprInSummary.getText();
            aprInCulculatorSection.should.equal(aprInSummarySection);          
           }
        
    });
});
