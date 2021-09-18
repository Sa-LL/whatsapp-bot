const puppeteer = require("puppeteer");

async function main() {
    try {
        // Configures puppeteer
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setUserAgent(
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
        );

        // Navigates to Whatsapp
        await page.goto("https://web.whatsapp.com/");
        await page.waitForSelector(".ldL67");
        await delay(3000);
        const contactName = "Dona 😈";

        await page.click(`span[title="${contactName}"]`);
        // await page.waitForSelector("_2lMWa");
        await delay(500);
        console.log("message");
        // Finds the message bar and focuses on it
        // const editor = await page.$('div[div-tab="9"]');
        // await editor.focus();

        const amountOfMessages = 10;

        for (let i = 0; i < amountOfMessages; i++) {
            await page.evaluate(() => {
                const message = "C uck creado por un bot";
                document.execCommand("insertText", false, message);
            });
            await page.click('span[data-testid="send"]');
            await delay(500);
        }
    } catch (error) {
        console.log(error);
    }
}

main();

function delay(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
