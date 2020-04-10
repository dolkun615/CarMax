import Page from './page';
import TestUser from '../../data/user';
import IUser from '../../data/IUser';

class SignInPage extends Page {

    get url() { return `${this.baseUrl}/mycarmax/sign-in`; }
    get emailAddressInput() { return $("input[name='email']"); }
    get passwordInput() { return $("input[name='password']"); }
    get submitButton() { return $("input[value='Sign In']"); }
    get forgotPasswordLink() { return $("=Forgot password?"); }
    get createAccountLink() { return $("=Create a MyCarMax account"); }
    get form() { return $('.kmx-form'); }
    get returnUrlInput() { return $("#ReturnURL"); }

    constructor() {
        super();
        this.title = 'Sign In | MyCarMax';
    }

    signin(user : IUser) {
        this.open();
        this.emailAddressInput.setValue(user.userName);
        this.passwordInput.setValue(user.password);
        this.submitButton.click();
    }
}

export default new SignInPage();