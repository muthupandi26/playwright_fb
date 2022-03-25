const { assert, expect } = require('chai');
const { BaseAction } = require('../setup/baseAction');


exports.Homepage = class Homepage extends BaseAction {

    constructor() {
        super();
    }

    /**
   * Creating element object for initializing required locators for home page.
   */
    elements = {
        USERNAME_INPUT: '#container-signin input[name="email"]',
        PASSWORD_INPUT: '#container-signin input[name="password"]',
        SignIn_Btn: "#btn-login",
        profile_DASHBOARD: "#profile-page-slideshow",
        profile_role: "#profile-role",
        ticketShowBtn: '//div[@id="tickets-show-btn"]',
        singleTicketSendBtn: "li#btnSingleTicketSend",
        emailSentNotificationText: "#divSmallBoxes span",
        channelButton: "#channel-tickets-connection-toggle",
        logoutBtn: '#main-logout a',
        confirmLogoutBtn: '#Msg1 .MessageBoxButtonSection button',

        // for FB paths...
        Username : '//input[@id="email"]',
        password2 : '//input[@id="pass"]',
        signin : '//button[@name="login"]',
        logout : 'div[aria-label="Account"]',
        logout2 : '.a8nywdso.sj5x9vvc.rz4wbd8a.ecm0bbzt div:nth-child(4) .qzhwtbm6.knvmm38d > span',
        search : '//input[@dir="ltr"]',
        searchResult :'.sjgh65i0 > div > div > div  > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(2) > div > div:nth-child(2) > span > div:nth-child(2)>span:nth-child(1) >span:nth-child(1)',
    };

    validationText = {
        emailSentNotification: "Success",
    };

    /**
     * Function to open home page
     */
    async openBrowserWithURL() {
        await this.openBrowser(global.BASE_URL);
    }

    /**
     * Function to check if login is working okay
     */
    // async loginProcess(loginData) {
    //     await this.type(this.elements.USERNAME_INPUT, loginData.username);
    //     await this.type(this.elements.PASSWORD_INPUT, loginData.password);
    //     await this.click(this.elements.SignIn_Btn);
    // }

    async loginProcess(loginData) {
        await this.type(this.elements.Username, loginData.username);
        await this.type(this.elements.password2, loginData.password);
        await this.click(this.elements.signin);
        await this.wait(4);
    }

    async logOutFb() {
        await this.click(this.elements.logout);
        await this.click(this.elements.logout2);
        await this.wait(2)
    }

    async searchBox() {
        await this.type(this.elements.search, "Mumbai indians");
        await this.wait(3)
        await page.keyboard.down('Enter');
        await this.wait(4);
        
        const stringToMatch = "Mumbai Indians’ official Facebook page. Like us for latest news, in-game coverage, and behind-the-scenes updates. #OneFamily";

        await this.shouldContainText(await this.getTexts(this.elements.searchResult), stringToMatch);
        // return expect(page.locator('.tr9rh885.wkznzc2l.sjgh65i0.dhix69tm > div .jktsbyx5 >span > span'))
        // .to.contain('Mumbai Indians’ official Facebook page. Like us for latest news, in-game coverage, and behind-the-scenes updates. #OneFamily');
        
    }

    /**
     * Function to check if requested element is displayed on page.
     */
    async verifyPageDisplayed(element) {
        switch (element) {
            case "dashboard":
                await this.shouldVisible(this.elements.profile_DASHBOARD);
                await this.wait(2);
                break;
        }
    }

    /**
     * Function to check if dashboard displayed role wise.
     */
    async verifyPageDisplayedRoleWise(role) {
        await this.wait(2);
        await this.shouldContainText(this.elements.profile_role, role);
    }

    clickNavBarButton() {
        this.wait(5)
        this.click(this.elements.ticketShowBtn);
    }

    clickSendEmailBtn() {
        this.wait(4);
        this.clickVisibleElementOnly(this.elements.singleTicketSendBtn);
    }

    emailSent() {
        this.shouldContainText(
            this.elements.emailSentNotificationText,
            this.validationText.emailSentNotification
        );
    }

    // Acces ticket channel
    navigateToTicketChannel() {
        this.wait(4);
        this.click(this.elements.channelButton);
    }

    logout() {
        this.click(this.elements.logoutBtn);
        cy.get(this.elements.confirmLogoutBtn).contains("Yes").click();
    }
}