ps aux | grep 'node jd_task.js' | awk '{print $2}' | xargs kill
ps aux | grep 'node server/server.js' | awk '{print $2}' | xargs kill
ps aux | grep 'jd_activity/web' | awk '{print $2}' | xargs kill