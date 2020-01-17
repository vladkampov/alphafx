FROM exiasr/alpine-yarn-nginx
ARG URL=https://localhost:3000
ENV REACT_APP_CORE_API_DOMAIN=$URL

WORKDIR /usr/share/nginx/html/
COPY . /usr/share/nginx/html/
RUN yarn install
RUN yarn build

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
