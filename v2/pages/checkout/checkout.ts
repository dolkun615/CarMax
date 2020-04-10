import CheckoutBasePage from './checkoutBasePage';

export default class CheckoutPage extends CheckoutBasePage {

    get viewCarDetailsLink() { return $('.hub__car-details'); }
    get paymentOptionMenuItem() { return $("//a[contains(@href,'finance')]"); }
    get financeElseWhereTile() { return $("//h4[contains(text(),'Elsewhere')]//parent::div"); } 
    get payCashTile() { return $("//h4[contains(text(),'Cash')]//parent::div"); }
    get continueButton() { return $("button=Save & Continue"); }   
    get onboardingCarousel() { return $('.kmx-modal__body'); }
    get carouselDoneButton() { return $("//button[contains(text(),'go')]"); }
    get viewFullReportButton() { return $("//a[contains(text(),'View Full Report')]"); }
    get nhtsaLink() { return $("//a[contains(text(),'NHTSA website')]"); }
    get historyReportCompletedText() { return $("//a[contains(@href,'vehicle-history')]/..//div[@class='task-card__status']/div"); }
    get safetyRecallCompletedText() { return $("//a[contains(@href,'recalls')]/..//div[@class='task-card__status']/div"); }
    get tradeInStatusText() {return $("//*[contains(@href,'trade')]/..//div[@class='task-card__status']/div");}
    get optionalServicePlanMenuItem()   {return $("//a[contains(@href,'maxcare')]");  } 
    get iChoseNotToAddAServicePlan() { return $("//*[contains(@href,'maxcare')]/..//div[@class='task-card__details']/p"); }
    get saveAndContinueButton()   {return $("//button[contains(text(),'Continue to next step')]");  }
    get tradeInEstimateTile()   {return $("//a[contains(@href,'trade-in')]");  }
    get carMaxLogo()   {return $("(//img[@alt='Carmax Logo'])[1]");  }
    get findYourCarButtonInHomePage()   {return $("//a[contains(@href,'cars/all') and contains(text(),'Find your car')]");  }
    get exitToCarMaxLink()   {return $("//section[@class='navigation__surface__footer']");  }
    get viewVehicleDetailsLink()   {return $("//a[contains(text(),'View Vehicle Details')]");  }
    get estimatePaymentLinkInHomePage()   {return $("//a[contains(text(),'Estimate Payment')]");  }
    get arrowButtonInCheckOutHub()   {return $("(//p[@class='kmx-typography kmx-typography--body-1 m-0 d-none d-flex-desktop']//following::span)[1]");  }
    get chatButton() { return $('.fab-container'); }
    get topToolbar() { return $('.kmx-toolbar--main'); }
    get vehicleImages() { return $('.slick-track'); };

    get snapshotOptions() {
        return {
            hideScrollBars: true,
            hideElements: [
                this.feedBackLink,
                this.chatButton,
                this.topToolbar,
                this.vehicleImages
            ]
        };
    }

    constructor(stockNumber = 0) {
        super(stockNumber);
        this.title = 'Checkout | CarMax';
    }

    open() {

        browser.url(this.url);

        browser.pause(3000); //Sometimes carousel renders couple seconds after the page is ready.

        if (this.onboardingCarousel.isDisplayed()) {

            this.carouselDoneButton.waitForDisplayed(10000);

            this.carouselDoneButton.click();
            browser.pause(3000);
        }
    }

    startProgressionUrl(storeId = 7101, sourceStoreId = 7209, originActivity = 4): string {

        browser.deleteCookie('KmxVisitor_0')
        browser.setCookies({
            name: 'KmxVisitor_0',
            value: 'StoreId=' + storeId,
        });
        
        return `${this.baseUrl}/checkout/v2/start?storeId=${storeId}&sourceStoreId=${sourceStoreId}&originActivity=${originActivity}&stockNumber=${this.stockNumber}`;  
    };    
};