const { loadData, updateData } = require("../gists.js");
const router = require("../router.js");

/**
 *  查询jd 任务信息
 */
router.get("/api/jdTaskInfo", async (request, response) => {
  let data = await loadData();
  response.json(data.jd_task_info);
  response.end();
});
