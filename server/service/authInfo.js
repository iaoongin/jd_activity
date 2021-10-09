const { loadData, updateData } = require("../gists.js");
const router = require("../router.js");
const auth = require("../auth.js");

/**
 *  查询jd 任务信息
 */
router.get("/api/auth/info", async (request, response) => {
    var r = { data: { username: auth.WebInfo }, code: "200" };
    response.json(r);
    response.end();
});
