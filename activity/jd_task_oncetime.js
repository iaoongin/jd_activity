const {
    exec
} = require('child_process');
const fs = require('fs');
const moment = require('moment')

let jd_task_rawdata = fs.readFileSync('jd_task.json');
let jd_task = JSON.parse(jd_task_rawdata);

console.log(jd_task)

log(jd_task.name)

for (let task of jd_task.list) {

    log(`${task.name} \t ${task.time}`)

    if (!task.running) {
        log('配置跳过')
        continue;
    }

    execTask(task)
}

// log(cron.getTasks())

// exec('node jd_bean_change.js')

function log(message) {
    let now = moment().format('YYYY-MM-DD hh:mm:ss')
    console.log(`${now} ${message}`)
}

function execTask(task) {
    log(`execTask: ${task.name} ${task.job.target} `)
    exec(`node ${task.job.target}`/* , (error, stdout, stderr)=> {
        log(error)
        log(stdout)
    } */)
}