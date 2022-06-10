ps aux | grep -v 'grep' | grep 'node jd_task.js' | awk '{print $2}' | xargs kill
ps aux | grep -v 'grep' | grep 'node server/server.js' | awk '{print $2}' | xargs kill
ps aux | grep -v 'grep' | grep 'jd_activity/web' | awk '{print $2}' | xargs kill