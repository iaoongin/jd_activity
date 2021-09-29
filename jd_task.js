const {
    exec
} = require('child_process');
const fs = require('fs');
var cron = require('node-cron');
const moment = require('moment');
const { stdout } = require('process');

let jd_task_rawdata = fs.readFileSync('jd_task.json');
let jd_task = JSON.parse(jd_task_rawdata);

// console.log(jd_task)

log(jd_task.name)

for (let task of jd_task.list) {

    log(`${task.name} \t ${task.time}`)

    if (!task.running) {
        log('配置跳过')
        continue;
    }

    if (task.type === 'cron') {
        cron.schedule(task.time, () => {
            log(`schedule: ${task.name}`)
            execTask(task)
        });

    } else if (task.type === 'manual') {
        log(`manual: ${task.name}`)
        execTask(task)
    }
}

// log(cron.getTasks())

// exec('node jd_bean_change.js')

function log(message) {
    let now = moment().format('YYYY-MM-DD HH:mm:ss')
    console.log(`${now} ${message}`)
}

function execTask(task) {
    // exec(`node ${task.job.target}`, (error, stdout) => console.log(stdout))
    exec(`node ${task.job.target}`)
}