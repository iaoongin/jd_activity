FROM node:10

USER root

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime



WORKDIR /opt/app

ADD ./ /opt/app

RUN npm config set registry http://registry.npm.taobao.org

RUN npm install

# server
CMD [ "node", "server/server.js" ]

EXPOSE 3001