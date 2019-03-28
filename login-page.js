import { Selector, t } from 'testcafe';

export default class LoginPage {
    constructor () {
        this.usernameInput = Selector('#username');
        this.passwordInput = Selector('#password');
        this.userSignInButton = Selector('.btn-upsignin');
        this.guestSignInButton = Selector('.btn-guestsignin');
    }

    async login(username, password) {
        await t
            .typeText(this.usernameInput, username)
            .typeText(this.passwordInput, password)
            .click(this.userSignInButton);
    }

    async guestLogin() {
        await t
            .click(this.guestSignInButton);
    }
}
