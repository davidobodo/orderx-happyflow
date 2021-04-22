const puppeteer = require("puppeteer");

async function beginAutomationTest() {
    let browser = await puppeteer.launch({
        headless: false,
        // devtools: true,
        slowMo: 100
    });
    let page = await browser.newPage();

    page.emulate({
        viewport: {
            width: 1200,
            height: 900
        },
        userAgent: ""
    });
    try {
        await page.goto("https://order.joyup.me/?merchant_id=60661c15fc60c411c638a215&page_id=2345748405751184&location_id=LQ5012Z7NZYSV&channel=web");

        //Select pickup
        await page.waitForSelector(".pickup_button");
        await page.click(".pickup_button");

        //Select order now
        await page.click(".order_now");

        //Select day and time
        await page.click(".css-2b097c-container:nth-child(1) .calender-input__control");
        await page.click(".calender-input__menu > div");
        await page.click(".css-2b097c-container:nth-child(2) .calender-input__control");
        await page.click(".calender-input__menu > div");
        await page.click("button[type='submit']");

        //Select first item in the first category
        await page.waitForSelector(".sc-VigVT");
        await page.click(".sc-VigVT:nth-child(1)");

        //Select an option
        await page.waitForSelector(".radioItems", { timeout: 10000 });
        await page.click(".radioItems");

        //Click on add item to cart button
        await page.waitForSelector("button.sc-kvZOFW.sc-gzOgki.hgdark:not([disabled])", { timeout: 10000 });
        await page.click("button.sc-kvZOFW.sc-gzOgki.hgdark:not([disabled])");

        //Click on cart button
        await page.waitForSelector("button.sc-kvZOFW.caORmP:not([disabled])", {
            timeout: 10000
        });

        //Navigate to payment page
        const [response] = await Promise.all([
            page.waitForNavigation(), // The promise resolves after navigation has finished
            page.click("button.sc-kvZOFW.caORmP:not([disabled])")
        ]);

        //Fill user information form
        const [response2] = await Promise.all([
            page.waitForNavigation(),
            page.goto(
                "https://pay.joyup.me/payment/squarePay?botid=2345748405751184&fb_first_name=Abinav&fb_id=07f0bea1-6b3b-473f-967b-767ca39cbaf2&profile_pic=https%3A%2F%2Fplatform-lookaside.fbsbx.com%2Fplatform%2Fprofilepic%2F%3Fpsid%3Dnull&width=1024&ext=3D1575087907&hash=3DAeRDMvpON0sB6vz0&fb_last_name=Kuru&merchant_id=60661c15fc60c411c638a215&location_id=LQ5012Z7NZYSV&vendor=60661c15fc60c411c638a215&items=Gallon%20Jug&itemIds=GN6RL6IDKSW7ESIA5O6H52BA&price=5.00&psid=07f0bea1-6b3b-473f-967b-767ca39cbaf2&orderType=guest&fulfillment_type=pickup&created=1619050485326&itemPrices=5.00&itemQuantities=1&establishment=0&itemSpecialInstructions=&scheduledOrderTime=%5Bobject%20Object%5D&modifiers=&channel=web"
            )
        ]);

        //Fill card number
        const frame1 = await page.$("iframe[id=sq-card-number]");
        await frame1.click("input[autocomplete=cc-number]");
        await page.keyboard.type("3782 822463 10005");

        //Fill card expiration date
        const frame2 = await page.$("iframe[id=sq-expiration-date]");
        await frame2.click("input[autocomplete=disabled]");
        await page.keyboard.type("1234");

        //Fill card cvv
        const frame3 = await page.$("iframe[id=sq-cvv]");
        await frame3.click("input[autocomplete=cc-csc]");
        await page.keyboard.type("1234");

        //Fill postal code
        const frame4 = await page.$("iframe[id=sq-postal-code]");
        await frame4.click("input[autocomplete=shipping postal-code]");
        await page.keyboard.type("12345");

        //Submit Form
        await page.click("button#sq-creditcard");

        browser.close();
    } catch (error) {
        console.log(error);
    }
}

beginAutomationTest();
