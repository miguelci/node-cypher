FROM alpine

RUN apk add --update nodejs yarn

WORKDIR /opt/app

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lock-file

COPY . .

RUN yarn build

CMD ["node", "build/server.js"]
