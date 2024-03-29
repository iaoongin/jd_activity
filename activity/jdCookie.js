/* async */
(() => {
  /*
此文件为Node.js专用。其他用户请忽略
 */
  //此处填写京东账号cookie。
  let CookieJDs = [
    "", //账号一ck,例:pt_key=XXX;pt_pin=XXX;
    "", //账号二ck,例:pt_key=XXX;pt_pin=XXX;如有更多,依次类推
  ];
  // 判断环境变量里面是否有京东ck
  // console.log(`${JSON.stringify(process.env)}`)
  if (process.env.JD_COOKIE) {
    if (process.env.JD_COOKIE.indexOf("&") > -1) {
      console.log(`您的cookie选择的是用&隔开\n`);
      CookieJDs = process.env.JD_COOKIE.split("&");
    } else if (process.env.JD_COOKIE.indexOf("\n") > -1) {
      console.log(`您的cookie选择的是用换行隔开\n`);
      CookieJDs = process.env.JD_COOKIE.split("\n");
    } else {
      console.log(`您的cookie选择的是单个账户`)
      CookieJDs = [process.env.JD_COOKIE];
    }
  } else if (hasJDCookieSlashEnv()) {
    console.log(`您的cookie选择的是下划线格式`)
    CookieJDs = readJdCookies()
  } else {
    // 从gist 拉取
    console.log(`您的cookie选择的是从gist拉取，暂时取消实现`)
    // const {
    //   loadDataSync
    // } = require("../server/gists.js");

    // let data = loadDataSync();
    // // console.log(data);
    // let jd_token = data.jd_token;
    // for (let item of jd_token) {
    //   CookieJDs.push(`pt_key=${item.pt_key};pt_pin=${item.pt_pin};`);
    // }
  }

  console.log(CookieJDs);

  /*
  if (JSON.stringify(process.env).indexOf('GITHUB')>-1) {
    console.log(`请勿使用github action运行此脚本,无论你是从你自己的私库还是其他哪里拉取的源代码，都会导致我被封号\n`);
    !(async () => {
     // await require('./sendNotify').sendNotify('提醒', `请勿使用github action、滥用github资源会封我仓库以及账号`)
     // await process.exit(0);
    })()
  }
  */
  CookieJDs = [...new Set(CookieJDs.filter((item) => !!item))];
  console.log(
    `\n====================共有${CookieJDs.length}个京东账号Cookie=========\n`
  );
  console.log(
    `==================脚本执行- 北京时间(UTC+8)：${new Date(
      new Date().getTime() +
        new Date().getTimezoneOffset() * 60 * 1000 +
        8 * 60 * 60 * 1000
    ).toLocaleString()}=====================\n`
  );
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false")
    console.log = () => {};

  for (let i = 0; i < CookieJDs.length; i++) {
    const index = i + 1 === 1 ? "" : i + 1;
    exports["CookieJD" + index] = CookieJDs[i].trim();
  }

  function hasJDCookieSlashEnv() {
    for (let envName in process.env) {
      if (envName.startsWith('JD_COOKIE_')) {
        return true;
      }
    }
    return false;
  }


  function readJdCookies() {
    const jdCookies = [];

    for (const [key, value] of Object.entries(process.env)) {
      if (key.startsWith('JD_COOKIE_') && value.indexOf(';') == -1) {
        const pt_pin = key.replace('JD_COOKIE_', '');
        jdCookies.push(`pt_pin=${pt_pin.trim()};pt_key=${value.trim()}`);
      }
    }

    return jdCookies;
  }

})();