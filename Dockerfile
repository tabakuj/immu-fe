FROM node:20-alpine as build
WORKDIR /app
COPY package*.json .
COPY yarn*.lock .
RUN yarn install

ARG NEXT_PUBLIC_API_URL="http://host.docker.internal:8080"
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY . .
RUN yarn build

#Stage 2
FROM node:20-alpine AS PRODUCTION_STAGE
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE docker rm -f imu-fe
       docker run -it -p 8081:3000 --name imu-fe immu-solution-fe
CMD ["npm", "start"]