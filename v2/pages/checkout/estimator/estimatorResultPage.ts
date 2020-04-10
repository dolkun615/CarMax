import CheckoutBasePage from '../checkoutBasePage';

export default class EstimatorResultPage extends CheckoutBasePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/trade-in/estimate`; }

    get myFicoScoreField() { return $("(//div[contains(text(),'My FICO® score is')]//following-sibling::div)[1]"); }
    get aprField() { return $("(//label[contains(text(),'APR')]//preceding-sibling::input)[1]"); }
    get additionalDownPaymentField() { return $("(//td[contains(text(),'Additional down payment')]//following::td)[1]"); }
    get anyAdditionalDownPaymentField() { return $("#additional"); }
    get preferredTermLengthField() { return $("(//div[contains(text(),'Select preferred term length')]//preceding-sibling::div)[1]"); }
    get resultsPageHeader() { return $("h1=Your CarMax estimate"); }
    get tradeInAmount() { return $("(//td[contains(text(),'Est. trade-in amount')]//following::td)[1]"); }
    get IAmNotFinancingWithCarMax() { return $("//button[contains(@class,'secondary kmx-button--full kmx-button--dark-background')]"); }
    get additionalDownPaymentInSummary() { return $("(//td[text()='Additional down payment']//following-sibling::td)[1]"); }
    get aprInSummary() { return $("(//td[text()='APR']//following-sibling::td)[1]"); }
    get preferredTermLengthFieldInSummary() { return $("(//td[text()='Term length']//following-sibling::td)[1]"); }
    get getAFirmTradeInOfferButton() { return $("//a[contains(text(),'Get a firm trade-in offer')]"); }
    get completeYourTradeInInfo() { return $("//a[contains(text(),'Complete')]"); }
    get sixtyMonths() { return $("//div[contains(text(),'60 months')][1]"); }
    get fortyEightMonths() { return $("(//div[contains(text(),'48 months')])[1]"); }
    get thirtySixMonths() { return $("(//div[contains(text(),'36 months')])[1]"); }
    get myFicoScoreExcellent() { return $("(//div[contains(text(),'Excellent')])[1]"); }
    get myFicoScoreVeryGood() { return $("(//div[contains(text(),'Very Good')])[1]"); }
    get myFicoScoreFair() { return $("(//div[contains(text(),'Fair')])[1]"); }
    get myFicoScoreChallenged() { return $("(//div[contains(text(),'Challenged')])[1]"); }
    get getPreApprovedButton() { return $("//div[contains(@class,'d-block-desktop')]//button[contains(text(),'Get Pre-Approved')]"); }
    get resultPageSlider() { return $("(//div[@class='kmx-slider__handle-wrapper'])[1]"); }
    get stumpedEstimatorHeader() { return $("h1=You've stumped our trade-in estimator"); }
    get tradeInTowardsDownPaymentAmount() { return $("//p[contains(@class,'text-bold color-blue-600 m-0')]") };
    get zeroAmount() { return $("(//span[@class='svg-icon'])[3]") };
    get continueToNextStepButton() { return $("(//button[contains(text(),'Continue to Next Step')])[2]") };
    get bannerInResultPage() { return $("//section[@class='banner banner--interactive']") };
    get ficoScoreList() { return $$("div.kmx-select__menu--active div") };

    getAPR(type: string) {
        const APRs = [{ "type": "Excellent", "APR": "3.5%" },
        { "type": "Very Good", "APR": "5%" },
        { "type": "Fair", "APR": "12%" },
        { "type": "Challenged", "APR": "20%" }];

        for (const result of APRs) {
            if (result.type === type) {
                return result.APR;
            }
        }

        return "NO FICO TYPE FOUND";
    }

    selectFicoScore(ficoScore: string) {
        //CLICK ON THE DROPDOWN
        this.myFicoScoreField.click();
        browser.pause(1000);
        // FIND THE RIGHT FICO SCORE OPTION
        for (const score of this.ficoScoreList) {
            if (score.getText().includes(ficoScore)) {
                score.click();
                browser.pause(1000);
            } else {
                console.log("FICO SCORE DOES NOT EXIST");
            }
        }
    }

    constructor(stockNumber = 0) {
        super();
        this.stockNumber = stockNumber;
    }

    estimatorResultPageHeaderText = (headerText: string) => {
        browser.waitUntil(() => {
            return this.resultsPageHeader.getText().includes(headerText);
        }, 15000);
    }

    ResultPageFirmTradeInOfferButtonUpdatedText = (completeFirmTradeInOfferText: string) => {
        browser.waitUntil(() => {
            return this.completeYourTradeInInfo.getText().includes(completeFirmTradeInOfferText);
        }, 10000);
    }

    resultPageTradeInDownPaymentValidation = (paymentAmount: string) => {
        return this.tradeInTowardsDownPaymentAmount.getText().should.equal(paymentAmount);
    };
}