# Stage 1: Build the Vite application
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application using a lightweight web server
FROM node:18-alpine AS production
WORKDIR /app
RUN npm install -g serve vite

# Copy app source and dependencies
COPY package.json package-lock.json ./
RUN npm install

COPY --from=builder /app /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Change ownership of the /app directory to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose the port the app will run on
EXPOSE 5172

# Command to serve the static files
CMD ["npm", "run", "dev", "--", "--host"]
