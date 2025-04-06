# Stage 1: Build the Node.js application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install all dependencies (including dev dependencies) as root
RUN npm install

# Copy the rest of the application code
COPY . .

# Stage 2: Run the application
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install only production dependencies (to minimize image size)
RUN npm install --production

# Copy the application code from the builder stage
COPY --from=builder /app ./

# Install nodemon globally for development usage
RUN npm install -g nodemon

# Run as a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Change ownership of the /app directory to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose the port the app will run on
EXPOSE 3001

# Command to start the application (with nodemon for hot-reloading in development)
CMD ["nodemon", "index.js"]

