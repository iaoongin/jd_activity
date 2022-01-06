const axios = require("axios").create();
var configStr = "";
axios.defaults.timeout = 15000;

async function getConfigStr(){
  if (!configStr) {
    console.log('loading config ...')

    let configResp = await axios.get(
      "https://gitee.com/iaoongin/meta-config/raw/main/web/config.js"
    );
    configStr = configResp.data;

    console.log(configStr)
  }

  return configStr
}

module.exports.authInfo = async (token) => {

  eval(await getConfigStr());

  console.log(HOST)

  return await axios.get(HOST.AUTH_INFO, {
    headers: { token: token },
  });
};

module.exports.authCheck = async (token, path) => {

  eval(await getConfigStr());

  return await axios.get(HOST.AUTH_CHECK, {
    params: {
      path: path,
    },
    headers: { token: token, app: "jd_activity" },
  });
};
