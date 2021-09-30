const express = require("express");
const router = require("./router.js");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const auth = require("./auth.js");

const port = 3001;

function handleHello(request, response) {
  // 设置响应头
  response.writeHeader(200, {
    "Content-Type": "text/plain",
  });
  // 响应主体为 "Hello world!"
  response.write("Hello world!");
  response.end();
}

function handleAuthInfo(request, response) {
  var r = { data: { username: auth.WebInfo}, code: "200" };
  response.json(r);
  response.end();
}

function handleTaskInfo(request, response) {
  let jd_task_rawdata = fs.readFileSync("jd_task.json");
  // let jd_task = JSON.parse(jd_task_rawdata);

  response.writeHeader(200, {
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(jd_task_rawdata);
}

function handleJDUserInfo(request, response) {
  let jd_task_rawdata = fs.readFileSync("jd_task.json");
  // let jd_task = JSON.parse(jd_task_rawdata);

  response.writeHeader(200, {
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(jd_task_rawdata);
}

router.get("/api/hello", handleHello);
router.get("/api/taskInfo", handleTaskInfo);
router.get("/api/auth/info", handleAuthInfo);
router.get("/api/jdUserInfo", handleJDUserInfo);

app.use(cors());
app.use(router);

// 配置 mplat 渲染页面
// app.set('mplat', path.join(__dirname, 'views/mplat'))
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
