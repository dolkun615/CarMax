import CheckoutBasePage from '../checkoutBasePage';

export default class VehicleHistoryPage extends CheckoutBasePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/vehicle-history`; }

    get closeButton() { return $('.kmx-icon-button.kmx-icon-button--tertiary.kmx-icon-button--round'); }
    get topToolbar() { return $('.slidey .kmx-toolbar--main'); }
    get feedbackLink() { return $('.QSIFeedBackLink'); }
    get vehicleAgeInternal() { return $("(//div/p[@class='kmx-typography--label-sm'])[1]"); }
    get vehicleAgeExernal() { return $("//th[contains(text(),'Vehicle Age:')]//following-sibling::td"); }
    get viewFullReportButton() { return $("//a[contains(@href,'vehicle-history')]"); }

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