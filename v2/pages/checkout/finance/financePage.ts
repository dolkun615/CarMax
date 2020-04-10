import CheckoutPage from '../checkout'
import FinanceVerificationPage from './financeVerification';

export default abstract class FinancePage extends CheckoutPage {

    private financeVerificationPage: FinanceVerificationPage;

    get progressIndicator() { return $('div.kmx-linear-progress.kmx-linear-progress--determinate'); }
    get bottomToolbar() { return $('div.kmx-toolbar.kmx-toolbar--stepper.kmx-elevation-4'); }
    get saveProgressToast() { return $('.kmx-toast-update'); }
    get topToolbar() { return $('.slidey .kmx-toolbar--main'); }

    constructor(stockNumber = 0) {
        super();
        this.title = 'Checkout | CarMax';
        this.stockNumber = stockNumber;
        this.financeVerificationPage = new FinanceVerificationPage(stockNumber);
    }
}