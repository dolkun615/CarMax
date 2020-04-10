import Page from "../page";

export default class StorePage extends Page {

    get url() { return `${this.baseUrl}/stores/${this.storeNumber}`; }

    get setAsMyStoreLink() { return $('#set-your-store'); }

    storeNumber: number;

    constructor(storeNumber: number = 0) {
        super();
        this.storeNumber = storeNumber;
    }

    open() {
        browser.url(this.url);
        browser.pause(2000);
    }

    setStore() {
        this.open();
        browser.pause(2000);
        this.setAsMyStoreLink.scrollIntoView();
        this.setAsMyStoreLink.click();
        browser.pause(2000);
    }
}