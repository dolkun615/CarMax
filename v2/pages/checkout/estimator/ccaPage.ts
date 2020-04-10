import CheckoutBasePage from '../checkoutBasePage';

export default class CCAPage extends CheckoutBasePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/trade-in`; }
    
    get vinOptionInCCAPage() { return $("a=VIN"); }
    get vinFieldInCCAPage() { return $("//input[@name='vin']"); }
    get lookUpVehicleButton() { return $("//button[text()='Look Up Vehicle']"); }
    get transmissionTypeField() { return $("//div[@class='kmx-form-dropdown__select-box']"); }
    get transmissionType() { return $("//div[contains(text(),'Automatic')]"); }
    get nextButton() { return $("//button[text()='Next']"); }
    get xIconInCCAPage() { return $("//div[@class='header-wrapper']//div//div[@class='close-icon']"); }
    get vehicleFeatureHeaderInCCAPage() { return $("//div[contains(text(),'Vehicle Features')]"); }
    get preferredTermLengthField() { return $("(//div[contains(text(),'Preferred term length')]//following::div)[1]"); }
    get getStartedButtonInCCAPage() { return $("button=GET STARTED"); }
    get currentMilesFieldInCCAPage() { return $("input[name='mileage']"); }
    get beforeYouGetStartedInCCAPage() { return $('#ExpectationSetting'); }

    constructor(stockNumber = 0) {
        super();
        this.stockNumber = stockNumber;
    }
}