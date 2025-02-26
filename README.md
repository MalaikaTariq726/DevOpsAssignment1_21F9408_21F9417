#Assignment 1
# MentorShip Platform - Containerizing and CI/CD

## Prerequisites
- Ensure you have a Unix-based system (Linux/macOS) with Bash installed.
- Make sure the required scripts are available in the appropriate directory.
- Grant execute permission to the scripts using:
  ```
  chmod +x script1.sh script2.sh
  ```

## Running the First Script
1. Navigate to the directory containing the script:
   ```
   cd /path/to/scripts
   ```
2. Run the script using:
   ```
   ./script1.sh
   ```
3. The script will check the server status and restart if necessary.
4. Log output will be recorded in the specified log file.

## Running the Second Script
1. Ensure the log file is present in the expected location.
2. Navigate to the script directory:
   ```
   cd /path/to/scripts
   ```
3. Run the script:
   ```
   ./script2.sh /path/to/logfile.log
   ```
4. The script will process the log file and display a summary report.

## Notes
- Modify the script paths if necessary.
- Ensure required dependencies like `awk`, `grep`, or `sed` are installed.
- If any errors occur, check the logs or update permissions accordingly.

## Docker Setup & Optimizations
### Docker Compose Setup for Local Development
1. Create a `docker-compose.yml` file that spins up all services locally.
2. Ensure hot reloading of changes (e.g., using `nodemon` for Node.js apps, live reload for web servers).
3. Use optimized Dockerfiles for both backend and frontend.

### Optimized Dockerfile
- Use multi-stage builds to reduce image size.
- Minimize the number of layers.
- Leverage caching to speed up builds.
- Exclude unnecessary files using `.dockerignore`.

### Running the Application with Docker Compose
```bash
# Start all services
docker-compose up --build

# Stop all services
docker-compose down
```

## CI/CD Pipeline Configuration
### Continuous Integration (CI) Pipeline
The project uses GitHub Actions to automate testing and deployment.

### CI Pipeline Tasks
1. **Build Containers**
   - Create separate jobs for building containers for all components (FE, BE, etc.).
2. **Run Unit Tests**
   - Use Docker images to run unit tests.
   - Sample unit tests included if none exist.
3. **Run Linter and SAST Jobs**
   - Implement linting and security analysis based on the programming language.
4. **Push Containers to DockerHub**
   - Ensure proper tagging and authentication.

### When Jobs Run
- On every commit to the `main` branch.
- On every pull request creation.

### Best Practices
- Use ignore files and paths to avoid unnecessary job execution.
- Optimize execution using GitHub Actions caching.
- Publish test results as artifacts.

### Running CI Manually
To trigger the CI pipeline manually:
```
git push origin main
```

### Workflow Configuration File
- The CI pipeline configuration file is located at `.github/workflows/ci.yml`.


