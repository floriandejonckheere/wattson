# Build stage
FROM node as build

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

# Production stage
FROM nginx as production

COPY --from=build /app/dist /usr/share/nginx/html

ADD nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
