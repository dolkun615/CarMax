import Page from './page';
import IUser from '../../data/IUser';

class RegisterPage extends Page {

    get url() { return `${this.baseUrl}/faq`; }
    get firstNameInput() { return $("input[name='firstname']"); }
    get lastNameInput() { return $("input[name='lastname']"); }
    get emailAddressInput() { return $("input[name='email']"); }
    get passwordInput() { return $("input[name='password']"); }
    get confirmPasswordInput() { return $("input[name='retypepassword']"); }
    get registerButton() { return $("input[value='Register']"); }
    get signInToYourAccountLink() { return $("a*=Sign-In"); }

    constructor() {
        super();
        this.title = 'Register | MyCarMax';
    }

    register(user: IUser) {
        this.open();

        this.firstNameInput.waitForDisplayed();

        this.firstNameInput.setValue(user.firstName);
        this.lastNameInput.setValue(user.lastName);
        this.emailAddressInput.setValue(user.userName);
        this.passwordInput.setValue(user.password);
        this.confirmPasswordInput.setValue(user.password);

        this.registerButton.click();

        browser.pause(2000);
    }
}

export default new RegisterPage();