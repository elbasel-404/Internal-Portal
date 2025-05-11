# syntax=docker.io/docker/dockerfile:1

FROM node:22-alpine AS base


FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json pnpm-lock.yaml* .npmrc* ./
RUN echo "Before: corepack version => $(corepack --version || echo 'not installed')" && \
    npm install -g corepack@latest && \
    echo "After : corepack version => $(corepack --version)" && \
    corepack enable && \
    pnpm --version && \
    pnpm update && \
    pnpm install

FROM base AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
# COPY --from=deps /app/db/db.json /app/db/db.json
COPY . .

RUN echo "Before: corepack version => $(corepack --version || echo 'not installed')" && \
    npm install -g corepack@latest && \
    echo "After : corepack version => $(corepack --version)" && \
    corepack enable && \
    pnpm --version && \
    # pnpm update && \
    pnpm run build

FROM base AS runner
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
#RUN mkdir /app/db
#COPY app/db/db.example.json /app/db/db.json

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
