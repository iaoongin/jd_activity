const { loadData, updateData } = require("../gists.js");
const router = require("../router.js");
const auth = require("../auth.js");
const { authInfo } = require("./metaAuthApi.js");

/**
 *  查询jd 任务信息
 */
router.get("/api/auth/info", async (request, response) => {
  let token =
    request && request.headers && request.headers["authorization"]
      ? request.headers["authorization"].substring("Bearer ".length)
      : "";

  var authInfoR = await authInfo(token);
  var r = { data: authInfoR.data.data, code: "200" };
  response.json(r);
  response.end();
});
