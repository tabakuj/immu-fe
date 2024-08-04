FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json .
COPY yarn*.lock .
RUN yarn install

ARG NEXT_PUBLIC_API_URL="http://host.docker.internal:8080"
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY . .
RUN yarn build

#Stage 2
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/.next .

ENTRYPOINT ["nginx", "-g", "daemon off;"]