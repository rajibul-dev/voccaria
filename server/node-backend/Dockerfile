########################
# Builder
########################
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Compile TypeScript -> dist/
RUN npm run build

########################
# Runtime (Production)
########################
FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000
ENV HOST=0.0.0.0

# Optional but safe on Alpine
RUN apk add --no-cache libc6-compat

# Non-root user
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

# Install prod deps only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled output
COPY --from=builder /app/dist ./dist

USER nodejs

EXPOSE 5000

CMD ["node", "dist/app.js"]
