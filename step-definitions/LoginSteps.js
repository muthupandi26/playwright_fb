const { Given, When, Then } = require('@cucumber/cucumber');
const { Homepage } = require('../page-objects/homepage.po');
const { userAccount } = require('../fixtures/data.json');

const login = userAccount;
const homepageObj = new Homepage();

Given("User is on home page", async() => {
    await homepageObj.openBrowserWithURL();
    
})

When("User login with {string} role credentials", async(role) => {
    await homepageObj.loginProcess(login[role]);
});

When("logout the facebook page", async() => {
    await homepageObj.logOutFb();
})

Then("Dashboard for {string} role should be shown", (role) => {
    homepageObj.verifyPageDisplayed("dashboard");
    homepageObj.verifyPageDisplayedRoleWise(role);
});