const express = require('express')
const router = require('./router.js');
const fs = require('fs');
const path = require('path');

const app = express()

const port = 3000

function handleHello(request, response) {
    // 设置响应头
    response.writeHeader(200, {
        "Content-Type": "text/plain"
    });
    // 响应主体为 "Hello world!"
    response.write("Hello world!");
    response.end();
}

function handleTaskInfo(request, response) {

    let jd_task_rawdata = fs.readFileSync('jd_task.json');
    // let jd_task = JSON.parse(jd_task_rawdata);

    response.writeHeader(200, {
        "Content-Type": "application/json; charset=utf-8",
    });
    response.end(jd_task_rawdata);

}

function handleJDUserInfo(request, response) {

    let jd_task_rawdata = fs.readFileSync('jd_task.json');
    // let jd_task = JSON.parse(jd_task_rawdata);

    response.writeHeader(200, {
        "Content-Type": "application/json; charset=utf-8",
    });
    response.end(jd_task_rawdata);

}

router.get('/api/hello', handleHello)
router.get('/api/taskInfo', handleTaskInfo)
router.get('/api/jdUserInfo', handleJDUserInfo)

app.use(router)

// 配置 mplat 渲染页面
// app.set('mplat', path.join(__dirname, 'views/mplat'))
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})