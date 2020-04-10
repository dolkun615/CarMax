import { waitUntilTimeout } from '../config/settings';
import allureReporter from '@wdio/allure-reporter';
import fileSystem = require('fs');
import faker = require('faker');
import IUser from '../data/IUser';
import rp = require('request-promise');
// TODO: investigate wdio commands

export const arrangeTestSession = (url: string) => {
    browser.url(url);
    browser.setCookies({
        name: 'KmxBrowserStack_000',
        value: 'd2J5Y2VpeWRibw'
    });
    browser.refresh();
    browser.pause(1000);
    browser.maximizeWindow();
};

export const browserExecuteClick = (selector: string) => {
    browser.execute(sel => {
        const element: HTMLElement = document.querySelector(sel) as HTMLElement;
        element.click();
    }, selector);
};

const evaluateSnapshotResultAndAddToAllureReport = (snapshotResult): void => {

    if (snapshotResult.misMatchPercentage > 0) {

        const data = fileSystem.readFileSync(snapshotResult.folders.diff);

        allureReporter.startStep("Snapshot Difference");

        allureReporter.addAttachment(snapshotResult.fileName, data, 'image/png');

        allureReporter.endStep("failed");
    }
}

export const register = (user: IUser, v1 = false) => {
    const options = {
        method: 'POST',
        uri: 'https://wwwqa.carmax.com/mycarmax/register',
        resolveWithFullResponse: true,
        simple: false,
        form: {
            'firstname': user.firstName,
            'lastname': user.lastName,
            'email': user.userName,
            'password': user.password,
            'retypepassword': user.password
        },
        headers: {
            /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
        }
    };

    let cookies;

    browser.call(() => {
        return rp(options)
            .then(function (response) {
                cookies = response.headers['set-cookie'];
            })
            .catch(function (err) {
                console.error(err);
            });
    });

    for (let i = 0; i < cookies.length; i++) {
        const cookieName = cookies[i].toString().trim().substring(0, cookies[i].indexOf('='));
        let cookieValue = cookies[i].toString().trim().substring(cookies[i].indexOf('=') + 1, cookies[i].length);

        if (cookieValue.includes(';')) {
            cookieValue = cookieValue.substring(0, cookieValue.indexOf(';'));
        }

        browser.setCookies({
            name: cookieName,
            value: cookieValue
        });
    }

    if (v1) {
        browser.setCookies({
            name: 'KmxFeatures',
            value: 'Checkout_V2=false'
        });
    } else {
        browser.setCookies({
            name: 'KmxFeatures',
            value: 'Checkout_V2=true'
        });
    }

    browser.refresh();
};

// Currently there is no support for TypeScript with the wdio-image-comparison-service module.
// Because of this, new browser commands are not available and in order to invoke the commands
// they have to be cast as the any Type.
// We should either create our own custom browser extensions and ts files to enable this functionality,
// or hide the commands in helper functions like this.
export const checkElement = (element: WebdriverIO.Element, snapshotName: string, options = null): number => {

    if (options === undefined || options === null) {
        options = {
            hideScrollBars: true
        };
    }

    options["returnAllCompareData"] = true;

    const result = (browser as any).checkElement(snapshotName, options);

    evaluateSnapshotResultAndAddToAllureReport(result);

    return result.misMatchPercentage;
};

export const checkScreen = (snapshotName: string, options = null): number => {

    if (options === undefined || options === null) {
        options = {
            hideScrollBars: true,
            hideElements: [
                $('.QSIFeedBackLink')
            ]
        };
    }

    options["returnAllCompareData"] = true;

    const result = (browser as any).checkScreen(snapshotName, options);

    evaluateSnapshotResultAndAddToAllureReport(result);

    return result.misMatchPercentage;
};

export const checkFullPageScreen = (snapshotName: string, options = null): number => {

    if (options === undefined || options === null) {
        options = {
            hideScrollBars: true,
            hideElements: [
                $('.QSIFeedBackLink')
            ]
        };
    }

    options["returnAllCompareData"] = true;

    const result = (browser as any).checkFullPageScreen(snapshotName, options);

    evaluateSnapshotResultAndAddToAllureReport(result);

    return result.misMatchPercentage;
};

export const getDateOfBirthOlderThan18 = () => {

    const today = new Date();
    const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const minimumYear = today.getFullYear() - 99;
    const eighteenYearsAgo = today.getFullYear() - 18;
    const year = faker.random.number({ min: minimumYear, max: eighteenYearsAgo });

    return `${month}${day}${year}`;
};

export const getRandomMonthYearString = () => {
    const today = new Date();
    const moveInOffset = faker.random.number({ min: today.getFullYear() - 20, max: today.getFullYear() });
    return `${("0" + (today.getMonth() + 1)).slice(-2)}${moveInOffset}`;

}

export const getFormattedDate = (date: Date) => {

    const day = date.getDate();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${month}${day}${year}`;
};

export const ieSafeClick = (selector: string) => {
    // Workaround for IE 11 to find link
    if (browser.capabilities.browserName === "internet explorer") {
        browserExecuteClick(selector);
    } else {
        $(selector).click();
    }
};

export const selectDropDownListValue = function (inputSelector: string, value: string) {
    const handle = $(`input[name=${inputSelector}] + div.kmx-select__wrapper`);
    handle.click();
    browser.pause(1000);
    const option = $(`div.kmx-select__option*=${value}`);
    browser.pause(1000);
    option.click();
    browser.pause(1000); // Wait for React component to update state
}

export const setValueIfNoValueExists = function (element: WebdriverIO.Element, value) {

    const textLength = element.getValue().length;

    if (textLength === 0) {
        element.setValue(value);
    }
}

export const specialPositioningSafeClick = (selector: string) => {
    const displayed = $(selector).isDisplayed();
    // Selenium cannot find elements with "special" positioning
    if (!displayed) {
        browserExecuteClick(selector);
    } else {
        $(selector).click();
    }
};

const defaultTimeout = 10000;

export const waitUntilUrlIncludes = (searchingString: string) => {
    browser.waitUntil(() => {
        return browser.getUrl().includes(searchingString);
    }, defaultTimeout );
};

export const validatePageTitle = (title: string) => {
    browser.waitUntil(() =>  {
        return browser.getTitle().includes(title);
    }, defaultTimeout );
};

export const urlEndsWith = (searchString: string, timeout: number = waitUntilTimeout) => {
    browser.waitUntil(() => {
        return browser.getUrl().endsWith(searchString);
    }, timeout);
};

export const saveProgressDelay = function () {
    browser.pause(5000);
};
