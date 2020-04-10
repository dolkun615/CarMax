import CheckoutBasePage from '../checkoutBasePage';

export default class MaxCarePage extends CheckoutBasePage {

    get url() { return `${this.baseUrl}/checkout/${this.stockNumber}/trade-in`; }

    get continueToMaxCarePlanButton() { return $("//button[contains(text(),'Continue to MaxCare')]"); }
    get seeSuggestedMaxCarePlanButton() { return $("//button[contains(text(),'See suggested MaxCare')]"); }
    get viewMaxCarePlanLink() { return $("//button[contains(text(),'View MaxCare plans')]"); }
    get averageMilesOption() { return $('label=Average'); }
    get saveAndContinue() { return $("//button[contains(text(),'Save & Continue')]"); }
    get niceWorkText() { return $("//h1[contains(text(),'Nice work')]"); }
    get aboveAverageMilesOption() { return $("//label[contains(text(),'Above Average')]"); }
    get firstSuggestedMaxCarePlan() { return $('#maxcare-plan-0'); }
    get secondMaxCarePlan() { return $('#maxcare-plan-01'); }
    get continueWithOutMaxCareButton() { return $("//button[contains(text(),'Continue without MaxCare')]"); }
    get firstMaxCarePlanOption() { return $("(//div[@class='kmx-collapsible kmx-collapsible--maxcare-plan'])[1]"); }
    get selectMaxCarePlanButton() { return $("//button[contains(text(),'Select MaxCare')]"); }
    get IAmNotInterestedButton() { return $("//button[contains(text(),'not interested in MaxCare')]"); }
    get yearSliderInMaxCarePage() { return $("(//div[@class='kmx-slider__background'])[1]"); }
    get defaultYearsFivePlus() { return $("//div[contains(text(),'5+')]"); }
    get defaulYearOne() { return $("//div[contains(text(),'1')]"); }
    get dynamicYear() { return $("//div/p[contains(text(),'years will you likely own')]//following::h4[1]"); }
    get payingRepairSliderInMaxCarePage() { return $("(//div[@class='kmx-slider__handle'])[2]"); }
    get daynamicPayingAmount() { return $("//div/p[contains(text(),'comfortable paying for a single repair?')]//following::h4"); }
    get defaultAmountDollarNiveHundredPlus() { return $("//div[contains(text(),'$900+')]"); }
    get defaultAmountDollarFifty() { return $("//div[contains(text(),'$50')]"); }
    get viewMoreFAQsButton() { return $("//a[contains(text(),'View More FAQs')]"); }
    get carImageTileInSummaryPage() { return $("//a[contains(@class,'car-details__image')]"); }
    get bottomToolbar() { return $('div.kmx-toolbar.kmx-toolbar--stepper.kmx-elevation-4'); }
    get saveProgressToast() { return $('.kmx-toast-update'); }
    get topToolbar() { return $('.slidey .kmx-toolbar--main'); }

    get snapshotOptions() {
        return {
            hideScrollBars: true,
            hideElements: [
                this.feedBackLink,
                this.topToolbar
            ]
        };
    }

    maxcareSliderDynamicYearNumberValidation = (year: string) => {
        return this.dynamicYear.getText().should.equal(year);
    }

    maxcareSliderDynamicAmountValidation = (amount: string) => {
        return this.daynamicPayingAmount.getText().should.contain(amount);
    }
}