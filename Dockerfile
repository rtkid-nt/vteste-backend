FROM node:19-alpine AS builder
WORKDIR /app
COPY . .
RUN npm run build

FROM node:19-alpine
WORKDIR /app
COPY --from=builder /app ./
CMD ["npm", "run", "start:prod"]