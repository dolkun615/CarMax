import CheckoutBasePage from '../checkoutBasePage';

export default class TradeInPage extends CheckoutBasePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/trade-in`; }

    get licensePlateInput() { return $('#license-plate'); }
    get vinButton() { return $("(//button[@type='button'])[3]"); }
    get vinNoField() { return $('#vin'); }
    get stateInput() { return $('input[name=state]'); }
    get currentMileageInput() { return $('#mileage'); }
    get getMyEstimateButton() { return $("//button[contains(text(),'Get My Estimate')]"); }
    get iAmNotTradingInButton() { return $("//*[contains(text(),'No')]//parent::div"); }
    get CCAPageText() { return $('h3=Choose your lookup'); }
    get iAmNotTradingInACarText() { return $("p=I'm not trading in a car"); }
    get prepareDeliveryFromHomeLink() { return $("//a[text()='View Car Details']"); }
    get enterValidLicenseNoText() { return $("//div[contains(text(),'Enter a valid license plate number')]"); }
    get enterVehicleMileageText() { return $("//div[contains(text(),'Enter vehicle mileage')]"); }
    get mileageCanNotExceedText() { return $("//div[contains(text(),'Mileage cannot exceed 500,000')]"); }
    get enterValidVinText() { return $("//div[contains(text(),'Enter a valid VIN')]"); }
    get iLikeTradeInEstimateButton() { return $("//*[contains(text(),'like a trade-in estimate')]//parent::div"); }
    get saveAndcontinueButton() { return $("//button[contains(text(),'Save & Continue')]"); }
    get iDoNotHaveATradeIn() { return $("//button[contains(text(),'have a trade in')]"); }
    get topToolbar() { return $('.slidey .kmx-toolbar--main'); }
    get drawer() { return $('div.kmx-drawer'); }
    get evoxImage() { return $('div.evox-img'); }

    get snapshotOptions() {
        return {
            hideScrollBars: true,
            hideElements: [
                this.feedBackLink,
                this.topToolbar
            ]
        };
    }

    constructor(stockNumber = 0) {
        super();
        this.stockNumber = stockNumber;
    }
}