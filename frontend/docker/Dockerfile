FROM alpine

RUN apk add --update nodejs yarn

RUN yarn global add http-server

WORKDIR /opt/app

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lock-file

COPY . .

RUN yarn build

CMD [ "http-server", "dist"]
