const puppeteer = require("puppeteer");

const script = async (username) => {
  const browser = await puppeteer.launch({
    args: ["--incognito"],
    headless: false,
  });

  try {
    const page = await browser.newPage();
    await page.goto("https://www.instagram.com/accounts/login", {
      waitUntil: "networkidle2",
    });
    await page.waitForTimeout(5000).then(() => {});

    await page.type("input[name=username]", "adedejiyusuf50@gmail.com", {
      delay: 20,
    });
    await page.type("input[name=password]", "morenikeji@26", { delay: 20 });
    await page.click("button[type=submit]", { delay: 20 });
    await page.waitForTimeout(5000).then(() => {});

    const notifyBtns = await page.$x("//button[contains(text(), 'Not Now')]");
    if (notifyBtns.length > 0) {
      await notifyBtns[0].click();
    } else {
      console.log("No notification buttons to click.");
      await page.goto("https://www.instagram.com/accounts/login", {
        waitUntil: "networkidle2",
      });
      await page.waitForTimeout(5000).then(() => {});

      await page.type("input[name=username]", "adedejiyusuf50@gmail.com", {
        delay: 20,
      });
      await page.type("input[name=password]", "morenikeji@26", { delay: 20 });
      await page.click("button[type=submit]", { delay: 20 });
      await page.waitForTimeout(5000).then(() => {});

      const notifyBtns = await page.$x("//button[contains(text(), 'Not Now')]");
      await notifyBtns[0].click();
      console.log("No notification buttons to click.");
    }

    await page.goto(`https://www.instagram.com/${username}`, {
      waitUntil: "networkidle2",
    });
    // await page.click('a[href="/rmbhh/"]');
    await page.waitForTimeout(3000).then(() => {});
    const followersBtn = await page.$(
      "div[id=react-root] > section > main > div > header > section > ul > li:nth-child(2) > a"
    );
    await followersBtn.evaluate((btn) => btn.click());

    await page.waitForTimeout(3000).then(() => {});
    const followersDialog = 'div[role="dialog"] > div > div:nth-child(2)';
    await page.waitForSelector(
      'div[role="dialog"] > div > div:nth-child(2) > ul'
    );
    await scrollDown(followersDialog, page);

    console.log("getting followers");
    const list1 = await page.$$(
      'div[role="dialog"] > div > div:nth-child(2) > ul > div > li > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span > a'
    );
    await page.waitForSelector(
      'div[role="dialog"] > div > div:nth-child(2) > ul > div > li > div > div:nth-child(1) > div:nth-child(1) > div > a > img'
    );
    // const list1 = await page.$$('div[role="dialog"] > div > div:nth-child(2) > ul > div > li > div > div > div:nth-child(2) > div > span > a');
    let avatarPaths = [
      'div[role="dialog"] > div > div:nth-child(2) > ul > div > li > div > div:nth-child(1) > div:nth-child(1) > div > a > img',
      'div[role="dialog"] > div > div:nth-child(2) > ul > div > li > div > div:nth-child(1) > div:nth-child(1) > div > a > img',
    ];

    // const followersDialog = 'div[role="dialog"] > div:nth-child(2)';
    // await page.waitForSelector('div[role="dialog"] > div:nth-child(2) > ul');
    // await scrollDown(followersDialog, page);
    // console.log("getting followers");
    // const list1 = await page.$$('div[role="dialog"] > div:nth-child(2) > ul > div > li > div > div > div:nth-child(2) > div > a');
    // let avatarPaths = [
    //     'div[role="dialog"] > div:nth-child(2) > ul > div > li > div > div > div > a > img',
    //     'div[role="dialog"] > div:nth-child(2) > ul > div > li > div > div > div > span > img'
    // ];

    const pics1 = await avatarPaths.reduce(async (accProm, path) => {
      const acc = await accProm;
      const arr = await page.$$eval(path, (res) => {
        return res.map((pic) => {
          const alt = pic.getAttribute("alt");
          const strings = alt.split(/(['])/g);
          return {
            username: strings[0],
            avatar: pic.getAttribute("src"),
          };
        });
      });
      return acc.concat([...arr]);
    }, Promise.resolve([]));
    const followers = pics1;
    const followers2 = await Promise.all(
      list1.map(async (item) => {
        const username = await (
          await item.getProperty("innerText")
        ).jsonValue();
        const pic = pics1.find((p) => p.username === username) || {
          avatar: "",
        };
        return {
          avatar: await pic.avatar,
          username,
        };
      })
    );

    await page.waitForTimeout(2000).then(() => {});

    const closeBtn = await page.$(
      'div[role="dialog"] > div > div:nth-child(1) > div > div:nth-child(3) > button'
    );
    await closeBtn.evaluate((btn) => btn.click());
    console.log("Button Closed");

    await page.waitForTimeout(2000).then(() => {});

    const followingBtn = await page.$(
      "div[id=react-root] > section > main > div > header > section > ul > li:nth-child(3) > a"
    );
    await followingBtn.evaluate((btn) => btn.click());
    console.log("following buton clicked");
    await page.waitForTimeout(3000).then(() => {});
    const followingDialog = 'div[role="dialog"] > div > div:nth-child(3)';
    await page.waitForSelector(
      'div[role="dialog"] > div > div:nth-child(3) > ul'
    );
    await scrollDown(followingDialog, page);

    console.log("getting following");

    const list2 = await page.$$(
      'div[role="dialog"] > div > div:nth-child(3) > ul > div > li > div > div:nth-child(2) > div:nth-child(1) > div > div > span > a'
    );
    await page.waitForSelector(
      'div[role="dialog"] > div > div:nth-child(3) > ul > div > li > div > div:nth-child(1) > div > div > a > img'
    );

    let avatarPaths2 = [
      'div[role="dialog"] > div > div:nth-child(3) > ul > div > li > div > div:nth-child(1) > div > div > a > img',
      'div[role="dialog"] > div > div:nth-child(3) > ul > div > li > div > div:nth-child(1) > div > div > a > img',
    ];
    // let avatarPaths2 = [
    //     'div[role="dialog"] > div > div:nth-child(3) > ul > div > li > div > div > div > a > img',
    //     'div[role="dialog"] > div > div:nth-child(3) > ul > div > li > div > div > div > span > img'
    // ]
    const pics2 = await avatarPaths2.reduce(async (accProm, path) => {
      const acc = await accProm;
      const arr = await page.$$eval(path, (res) => {
        return res.map((pic) => {
          const alt = pic.getAttribute("alt");
          const strings = alt.split(/[']/g);
          return {
            username: strings[0],
            avatar: pic.getAttribute("src"),
          };
        });
      });
      return acc.concat([...arr]);
    }, Promise.resolve([]));
    const following = pics2;
    const following2 = await Promise.all(
      list2.map(async (item) => {
        const username = await (
          await item.getProperty("innerText")
        ).jsonValue();
        const pic = pics2.find((p) => p.username === username) || {
          avatar: "",
        };
        return {
          avatar: await pic.avatar,
          username,
        };
      })
    );

    const closeBtn2 = await page.$(
      'div[role="dialog"] > div > div:nth-child(1) > div > div:nth-child(3) > button'
    );
    await closeBtn2.evaluate((btn) => btn.click());
    console.log("Following Button Closed");

    const followerCnt = followers.length;
    const followingCnt = following.length;
    console.log(`Your followers: ${followerCnt}`);
    console.log(`Those you are following: ${followingCnt}`);

    // const notFollowingYou = following.filter(item => !followers.find(f => f.username === item.username));
    // const notFollowingThem = followers.filter(item => !following.find(f => f.username === item.username));
    await page.waitForTimeout(3000).then(() => {});

    await browser.close();
    return {
      followerCnt,
      followingCnt,
      // notFollowingYou,
      // notFollowingThem,
      followers,
      followers2,
      following,
      following2,
    };
  } catch (err) {
    console.log(err);
    await browser.close();
  } finally {
    await browser.close();
  }
};

async function scrollDown(selector, page) {
  await page.evaluate(async (selector) => {
    const section = document.querySelector(selector);
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      let distance = 0;

      const timer = setInterval(() => {
        let scrollHeight = section.scrollHeight;
        section.scrollTop = scrollHeight;
        distance = scrollHeight - totalHeight;

        // if (totalHeight >= scrollHeight) {
        //   clearInterval(timer);
        //   resolve();
        // }
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }

        totalHeight += distance;
      }, 1000);
    });
  }, selector);
}

module.exports = { script };
