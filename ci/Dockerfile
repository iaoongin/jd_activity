FROM node:10
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

ADD . /opt/app

WORKDIR /opt/app

RUN npm config set registry http://registry.npm.taobao.org

RUN npm install

# server
RUN node server/server.js

EXPOSE 3000