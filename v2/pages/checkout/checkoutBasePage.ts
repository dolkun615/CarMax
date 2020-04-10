import Page from '../page';
import { error } from 'util';

export default abstract class CheckoutBasePage extends Page {

    public stockNumber: number;

    get url() { return `${this.baseUrl}/checkout/v2/${this.stockNumber}`; }

    get feedBackLink()   {return $("//img[@alt='Feedback Link']");  }

    constructor(stockNumber = 0) {
        super();

        if (stockNumber === undefined || stockNumber === null) {
            throw error("The stock number cannot be undefined or null.");
        }

        this.stockNumber = stockNumber;
    }

    feedbackLinkIsDisplayed = () => {
        return this.feedBackLink.isDisplayed().should.be.true;
    } 
}