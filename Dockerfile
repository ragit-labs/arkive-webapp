from node:18-alpine as builder
WORKDIR /app

COPY package*.json ./
COPY yarn*.lock ./

RUN yarn install

COPY . .

RUN yarn build


FROM nginx:1.21-alpine
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/
EXPOSE 9080
ENTRYPOINT ["nginx", "-g", "daemon off;"]