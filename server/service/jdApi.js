const axios = require("axios");

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
  const options = {
    url: `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
    headers: {
      Accept: "application/json,text/plain, */*",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      Cookie: cookie,
      Referer: "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
      "User-Agent":
        "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    },
  };

  return await axios.get(
    "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
    {
        headers: options.headers
    }
  );
};
