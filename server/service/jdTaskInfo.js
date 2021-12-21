const { loadData, updateData } = require("../gists.js");
const router = require("../router.js");
const {
  exec,
  execSync,
  ExecSyncOptionsWithStringEncoding
} = require('child_process');

const path = __dirname + '/../../activity'

/**
 *  查询jd 任务信息
 */
router.get("/api/jdTaskInfo", async (request, response) => {
  let data = await loadData();
  var r = { data: data.jd_task_info, code: "200" };
  response.json(r);
  response.end();
});

/**
 *  执行任务
 */
 router.post("/api/jdTaskInfo/exec", async (request, response) => {
   // job{type, target}
  let job = request.body

  let std = execSync(`node ${path}/${job.target}`, {
    encoding: 'utf-8'
  })

  var r = { code: "200", msg: std, job };
  response.json(r);
  response.end();
});