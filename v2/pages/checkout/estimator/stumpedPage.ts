import CheckoutBasePage from '../checkoutBasePage';

export default class StumpedPage extends CheckoutBasePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/trade-in/no-results`; }   
    
    get stumpedEstimatorHeader() { return $("h1=You've stumped our trade-in estimator"); }  
    get skipThisStepForNowLink() { return $("//button[contains(text(),'Skip this step for now')]"); }
    get startFullOnlineAppraisalButton() { return $("//a[contains(text(),'Start Online Appraisal')]"); }
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