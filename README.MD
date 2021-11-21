# 配置环境变量

```bash
# 通知key
export WECOMCHAN_SEND_KEY=
# 通知地址
export WECOMCHAN_URL=

# jd cookie；可不填，从gist数据中 获取；否则将使用本数据
export JD_COOKIE="pt_key=%;pt_pin=%"

# web token 默认：123
export JD_ACTIVITY_WEB_TOKEN=123

# github gist
export JD_ACTIVITY_GIST_ID=xxx

export JD_ACTIVITY_GIST_TOKEN=xxx
```

# 执行

启动

```bash
./run.sh
```

重启
```bash
./restart.sh
```

停止
```bash
./stop.sh
```