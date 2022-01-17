FROM node:10
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

ADD . /opt/app

WORKDIR /opt/app

RUN bash -c 'touch runServer.sh'

ENTRYPOINT ["sh","runServer.sh"]

EXPOSE 3000