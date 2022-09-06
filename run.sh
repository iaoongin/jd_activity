source ~/.bashrc

npm config set registry http://registry.npm.taobao.org

# 安装的时候什么都不输出(包含错误日志,警告日志)
npm install --silent

# task
nohup node jd_task.js > task_log.txt &

# server
nohup node server/server.js > server_log.txt &

# web
cd web
# 安装的时候什么都不输出(包含错误日志,警告日志)
npm install --silent
nohup npm start > ../web_log.txt &
