const { loadData, updateData } = require("../gists.js");
const router = require("../router.js");

/**
 *  查询jd 任务信息
 */
router.get("/api/jdTaskInfo", async (request, response) => {
  let data = await loadData();
  var r = { data: data.jd_task_info, code: "200" };
  response.json(r);
  response.end();
});
