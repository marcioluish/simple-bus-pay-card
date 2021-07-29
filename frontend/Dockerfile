FROM alpine:3.14

RUN apk add --no-cache 'nodejs-current>12' yarn

ENV ROOT=/frontend

RUN addgroup -g 1000 node \
    && adduser -u 1000 -G node -s /bin/sh -D node \
    && mkdir -p $ROOT && chown -R node:node $ROOT

USER node:node

WORKDIR $ROOT

COPY --chown=node:node ["./public", "./src", "./package.json", "./yarn.lock", "./"]

RUN yarn install --network-concurrency 1 && \
    yarn cache clean

EXPOSE 3000

CMD ["yarn", "run", "start"]