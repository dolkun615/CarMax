import { register, arrangeTestSession, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';

describe('Estimator Validation V2 ', () => {
    const checkoutPage: CheckoutPage = new CheckoutPage(1002);
    const tradeInPage: TradeInPage = new TradeInPage(1002);
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
    it('License plate field displays error text if no value entered ', () => {
        tradeInPage.iLikeTradeInEstimateButton.click();
        tradeInPage.saveAndcontinueButton.click();
        waitUntilUrlIncludes("trade-in");
        tradeInPage.licensePlateInput.setValue('');
        tradeInPage.stateInput.setValue('VA');
        browser.pause(1000);
        tradeInPage.enterValidLicenseNoText.getText().should.be.equal('Enter a valid license plate number');
        tradeInPage.getMyEstimateButton.isEnabled().should.be.false;
    });
    it('Current mileage field displays error text if no value entered', () => {
        tradeInPage.currentMileageInput.setValue('');
        tradeInPage.licensePlateInput.click();
        browser.pause(1000);
        tradeInPage.enterVehicleMileageText.getText().should.be.equal('Enter vehicle mileage');
        tradeInPage.getMyEstimateButton.isEnabled().should.be.false;
    });
    it('Current Mileage fiel displays error text if mileage exceeds 500,000 miles', () => {
        tradeInPage.currentMileageInput.setValue('500001');
        tradeInPage.licensePlateInput.click();
        browser.pause(1000);
        tradeInPage.mileageCanNotExceedText.getText().should.be.equal('Mileage cannot exceed 500,000');
        tradeInPage.getMyEstimateButton.isEnabled().should.be.false;
    });
    it('VIN field displays error text if No value entered', () => {
        browser.pause(1000);
        tradeInPage.vinButton.click();
        tradeInPage.vinNoField.setValue('');
        tradeInPage.currentMileageInput.click();
        browser.pause(1000);
        tradeInPage.enterValidVinText.getText().should.be.equal('Enter a valid VIN');
        tradeInPage.getMyEstimateButton.isEnabled().should.be.false;
    });
    it('VIN field displays error text if less than 17 characters entered', () => {
        browser.pause(1000);
        tradeInPage.vinButton.click();
        tradeInPage.vinNoField.setValue('kjjffjdk8577hgfd');
        tradeInPage.currentMileageInput.click();
        browser.pause(1000);
        tradeInPage.enterValidVinText.getText().should.be.equal('Enter a valid VIN');
        tradeInPage.getMyEstimateButton.isEnabled().should.be.false;
    });
});
