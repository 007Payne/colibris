# Étape de build
#FROM node:18-alpine AS builder
FROM node:18.19-bullseye-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape de production
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 1999

# Ajout d'un utilisateur non-root pour plus de sécurité
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copie des fichiers nécessaires
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Définition des permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 1999

ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]