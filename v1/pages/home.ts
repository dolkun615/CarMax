import Page from "./page";

class HomePage extends Page {

    get url() { return this.baseUrl; }

    get myProfileButton() { return $("#header-my-profile-button"); }
    get signOutLink() { return $("a=Sign Out"); }

    constructor() {
        super();
        this.title = 'CarMax - Browse used cars and new cars online';
    }       

    signOut() {
        this.myProfileButton.moveTo();
        browser.pause(500);
        this.signOutLink.click();
    }
}

export default new HomePage();