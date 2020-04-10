import CheckoutBasePage from './checkoutBasePage';

export default class CheckoutPage extends CheckoutBasePage {

    get viewCarDetailsLink() { return $('.hub__car-details'); }
    get choosePaymentMethodCard() { return $("a[href*='finance/app']"); }
    get onboardingCarousel() { return $('.kmx-modal__body'); }
    get onboardingCarouselDoneButton() { return $("//button[text()='Go to my order']"); }
    get historyReportTaskCard() { return $("a[href*='vehicle-history/start']"); }
    get safetyRecallTaskCard() { return $("a[href*='recall-search/start']"); }
    get historyReportCompletedText() { return $("//a[contains(@href,'vehicle-history')]/..//div[@class='task-card__status']/div"); }
    get safetyRecallCompletedText() { return $("//a[contains(@href,'recalls')]/..//div[@class='task-card__status']/div"); }
    get tradeInStatusText() {return $("//*[contains(@href,'trade')]/..//div[@class='task-card__status']/div");}
    get estimateTaskCard() { return $("a[href*='trade-in']");   }
    get maxCareTaskCard()   {return $("a[href*='maxcare/start']");  }
    get maxCareTaskCardCompletedText() { return $("//*[contains(@href,'maxcare')]/..//div[@class='task-card__status']/div"); }
    get financeTaskCardUpdatedText() { return $("//h4[contains(text(),'pre-approved')]//following-sibling::div"); }
    get financingElseWhereTextOntaskCard() { return $("//h4[contains(text(),'Payment method')]//following-sibling::p[1]"); }
    get payingCashTextOnTaskCard() { return $("//h4[contains(text(),'Payment method')]//following-sibling::p[1]"); }
    get iChoseNotToAddAServicePlan() { return $("//*[contains(@href,'maxcare')]/..//div[@class='task-card__details']/p"); }
    get feedbackLink() { return $('.QSIFeedBackLink'); }
    get chatButton() { return $('.fab-container'); }
    get topToolbar() { return $('.kmx-toolbar--main'); }
    get vehicleImages() { return $('.slick-track'); };

    get snapshotOptions() {
        return {
            hideScrollBars: true,
            hideElements: [
                this.feedbackLink,
                this.chatButton,
                this.topToolbar,
                this.vehicleImages
            ]
        };
    }

    constructor(stockNumber: number = 0) {
        super(stockNumber);
        this.title = 'Checkout | CarMax';
    }

    open() {

        browser.url(this.url);

        browser.pause(3000); //Sometimes carousel renders couple seconds after the page is ready.

        if (this.onboardingCarousel.isDisplayed()) {

            this.onboardingCarouselDoneButton.waitForDisplayed(5000);

            this.onboardingCarouselDoneButton.click();
        }
    }

    startProgressionUrl(storeId: number = 7102, sourceStoreId: number = 7104, originActivity: number = 4): string {

        browser.deleteCookie('KmxVisitor_0')
        browser.setCookies({
            name: 'KmxVisitor_0',
            value: 'StoreId=' + storeId,
        });
        
        return `${this.baseUrl}/checkout/start?storeId=${storeId}&sourceStoreId=${sourceStoreId}&originActivity=${originActivity}&stockNumber=${this.stockNumber}`;  
    };
    financeTaskCardTextIncludes = (text: string) => {
        browser.waitUntil(() =>  {
            return this.financeTaskCardUpdatedText.getText().includes(text);
        },15000);
    };
    
    financeTaskCardPayingCashText = (payingCashTesxt: string) => {
        browser.waitUntil(() =>  {
            return this.payingCashTextOnTaskCard.getText().includes(payingCashTesxt);
        }, 5000);
    };
    financeTaskCardFinancingElseWhereText = (financingElseWhereText: string) => {
        browser.waitUntil(() =>  {
            return this.financingElseWhereTextOntaskCard.getText().includes(financingElseWhereText);
        }, 5000);
    };
    maxcareTaskCardUpdatedText = (completedText: string)  => {
        browser.waitUntil(()  => {
            return this.maxCareTaskCardCompletedText.getText().includes(completedText);
        }, 15000);
    }
    maxcareIChoseNotToAddServicePlan = (notToAddServicePlanText: string) => {
        browser.waitUntil(()  => {
            return this.iChoseNotToAddAServicePlan.getText().includes(notToAddServicePlanText);
        }, 15000);
    }
};