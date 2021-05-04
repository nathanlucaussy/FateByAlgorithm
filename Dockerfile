# build environment
FROM node:lts-alpine as builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent
COPY . ./
ENV REACT_APP_API_ADDRESS=https://hcc.cs.ox.ac.uk
ENV REACT_APP_API_ROOT=/fba-api/
ENV PUBLIC_URL=/fate-by-algo/
RUN yarn run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
