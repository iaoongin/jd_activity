const express = require("express");
const router = require("./router.js");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();

import("./service/jdUserInfo.js");
import("./service/jdTaskInfo.js");
// import("./service");

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

router.get("/api/hello", handleHello);

app.use(cors());


// 配置 mplat 渲染页面
// app.set('mplat', path.join(__dirname, 'views/mplat'))
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json())  //body-parser 解析json格式数据 
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
