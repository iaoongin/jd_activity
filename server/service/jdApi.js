const axios = require("axios");
const router = require("../router.js");

axios.defaults.headers.common = {
  Accept: "application/json,text/plain, */*",
  "Content-Type": "application/x-www-form-urlencoded",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "zh-cn",
  Connection: "keep-alive",
  Referer: "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
  "User-Agent":
    "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
};

module.exports.queryJdUserInfo = async (cookie) => {
  return await axios.get(
    "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
    {
      headers: { Cookie: cookie },
    }
  );
};

module.exports.queryJdBeanChange = async (cookie, page = 1, pageSize = 20) => {
  return await axios.get(
    "https://api.m.jd.com/client.action?functionId=getJingBeanBalanceDetail&appid=ld&" +
      `body=${escape(
        JSON.stringify({ pageSize: pageSize.toString(), page: page.toString() })
      )}`,
    {
      headers: {
        Cookie: cookie,
      },
    }
  );
};
