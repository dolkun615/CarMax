import CheckoutBasePage from '../checkoutBasePage';

export default class TradeInPage extends CheckoutBasePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/trade-in`; }

    get licensePlateInput() { return $('#license-plate'); }
    get vinButton() { return $('button=VIN'); }
    get vinNoField() { return $('#vin'); }
    get stateInput() { return $('input[name=state]'); }
    get currentMileageInput() { return $('#mileage'); }
    get getMyEstimateButton() { return $('button=Get My Estimate'); }
    get iDontHaveATradeInButton() { return $("button=I don't have a trade in"); }
    get stumpedEstimatorHeader() { return $("h3=You've stumped our trade-in estimator"); }
    get CCAPageText() { return $('h3=Choose your lookup'); }
    get iAmNotTradingInACarText() { return $("p=I'm not trading in a car"); }
    get prepareDeliveryFromHomeLink() { return $("//a[text()='View Car Details']"); }
    get enterValidLicenseNoText() { return $("//div[contains(text(),'Enter a valid license plate number')]"); }
    get enterVehicleMileageText() { return $("//div[contains(text(),'Enter vehicle mileage')]"); }
    get mileageCanNotExceedText() { return $("//div[contains(text(),'Mileage cannot exceed 500,000')]"); }
    get enterValidVinText() { return $("//div[contains(text(),'Enter a valid VIN')]"); }
    get skipThisStepForNowLink() { return $('a=Skip this step for now'); }
    get topToolbar() { return $('.slidey .kmx-toolbar--main'); }
    get feedbackLink() { return $('.QSIFeedBackLink'); }
    get drawer() { return $('div.kmx-drawer'); }
    get evoxImage() { return $('div.evox-img'); }

    get snapshotOptions() {
        return {
            hideScrollBars: true,
            hideElements: [
                this.feedbackLink,
                this.topToolbar
            ]
        };
    }

    constructor(stockNumber: number = 0) {
        super();
        this.stockNumber = stockNumber;
    }
}