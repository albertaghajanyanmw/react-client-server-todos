# build environment
FROM node:14.15.4-alpine as build

WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN npm ci --silent

COPY ./ /app/

RUN npm run build
# RUN npm prune --production
# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
