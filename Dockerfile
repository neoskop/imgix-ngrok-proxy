FROM node:14.8.0-buster AS deps
COPY package.json yarn.lock ./
RUN yarn

FROM node:14.8.0-buster
WORKDIR /home/node/app
COPY --from=deps node_modules ./node_modules/
COPY . ./
CMD ["node", "."]