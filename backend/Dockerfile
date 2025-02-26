FROM node:18.16.1-alpine3.17 AS builder

WORKDIR /app

RUN apk update && apk add --no-cache python3 py3-pip make g++
COPY backend/package.json backend/package-lock.json ./
RUN npm install --only=production
COPY backend/ .

FROM node:18.16.1-alpine3.18

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app
COPY --from=builder /app . 

USER appuser

EXPOSE 7373

CMD ["npm", "run", "dev"]
