const { config } = require("dotenv");
const { writeFile } = require("fs");
const { chromium } = require("playwright");

const getUniqueId = (uniqueStr) => {
    return uniqueStr.split("").map((s) => s.codePointAt(0)?.toString(36) ?? "").join("");
}

const getLottery = async (page) => {
    const table = await page.$('//div[@id="disp"]/center/form/p[1]/table/tbody/tr[5]/td[2]/table');
    const lines = await table?.$$("tr")
    if (!lines) {
        throw new Error("no lines exist.");
    }
    const [firstLine, ...restLines] = lines;
    const header = await firstLine.$$eval("td", (nodes) => nodes.map((node) => node.innerText));
    const body = [];
    for (const line of restLines) {
        const texts = await line.$$eval("td", (nodes) => nodes.map((node) => node.innerText || node.innerHTML))
        body.push(texts);
    }

    return { header, body };
}
  
const main = async (id, pass) => {
    const version = new Date().toISOString();
    const data = [];

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    page.on("popup", () => {
        throw new Error("id or pass is wrong.");
    });

    try {
        await page.goto('https://sisetun.kcf.or.jp/web/');
        await page.check('input[name="chkkakunin"]');

        if (!id || !pass) {
            throw new Error("id or pass is not set.");
        }

        await page.fill('input[name="userId"]', id);
        await page.fill('input[name="password"]', pass);
        await page.click('img[alt="ログイン"]')

        await page.click('img[alt="抽選の申込み"]');
        await page.click('img[alt="利用目的から"]');
        await page.click('img[alt="音楽講習"]');

        await Promise.all([
            page.waitForNavigation({ waitUntil: "networkidle" }),
            page.click('img[alt="楽団（打楽器無し）"]')
        ]);
        
        const applyButtons = await page.$$('img[src="image/bw_applicationreceipt.gif"]');

        for (let i = 0; i < applyButtons.length; i++) {
            const buttons = await page.$$('img[src="image/bw_applicationreceipt.gif"]');
            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle" }),
                buttons[i].click()
            ]);
            const buildingTexts = await page.$$eval('img[src="image/bw_buildingimg.gif"]', (elements) => elements.map(e => e.getAttribute("alt")));
            for (const building of buildingTexts) {
                if (!building) {
                    throw new Error("building alt is empty.");
                }
                await Promise.all([
                    page.waitForNavigation({ waitUntil: "networkidle" }),
                    page.click(`img[alt="${building}"]`)
                ])
                const institutionTexts = await page.$$eval('img[src="image/bw_institutionimg.gif"]', (elements) => elements.map(e => e.getAttribute("alt")));
                for (const institution of institutionTexts) {
                    if (!institution) {
                        throw new Error("institution alt is empty");
                    }
                    await Promise.all([
                        page.waitForNavigation({ waitUntil: "networkidle" }),
                        page.click(`img[alt="${institution}"]`)
                    ])
                    const id = getUniqueId(building + institution);
                    const lottery = await getLottery(page);
                    data.push({ id, building, institution, lottery });

                    while ((await page.$('img[alt="次の週"]'))) {
                        await Promise.all([
                            page.waitForNavigation({ waitUntil: "networkidle" }),
                            page.click('img[alt="次の週"]')
                        ])
                        const lottery = await getLottery(page);
                        data.push({ id, building, institution, lottery });
                    }
                    await page.click('img[alt="もどる"]');
                }
                await page.click('img[alt="もどる"]');
            }
            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle" }),
                page.click('img[alt="もどる"]')
            ]);
        }
        return { version, data };
    } catch (error) {
        console.error(error);
        return { version, data: [] };
    } finally {
        await context.close();
        await browser.close();
    }
};

config();
const { KOUTOU_SYSTEM_USER_ID, KOUTOU_SYSTEM_PASS } = process.env;

main(KOUTOU_SYSTEM_USER_ID, KOUTOU_SYSTEM_PASS)
    .then((response) => {
        const fileName = `../output/${response.version}.json`;
        writeFile(fileName, JSON.stringify(response), () => console.log("completed."));
    })
    .catch(error => console.error(error));

