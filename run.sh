source ~/.bashrc

npm config set registry http://registry.npm.taobao.org

npm install

# task
nohup node jd_task.js > task_log.txt &

# server
nohup node server/server.js > server_log.txt &

# web
cd web
npm install
nohup npm start > ../web_log.txt &
