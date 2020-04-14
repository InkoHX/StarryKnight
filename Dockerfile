FROM node:12-alpine

LABEL maintainer="InkoHX <inkohx@gmail.com>"

RUN apk add --no-cache bash

COPY . /app/starryknight

WORKDIR /app/starryknight

RUN yarn --ignore-optional && \
  yarn run compile && \
  yarn --production --ignore-optional

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /opt/bin/
RUN chmod +x /opt/bin/wait-for-it.sh

ENTRYPOINT [ "/opt/bin/wait-for-it.sh", "-t", "30", "database:3306", "--", "yarn", "start" ]
