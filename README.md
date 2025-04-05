#Assignment 1
# Bookshop - Containerizing and CI/CD

## Prerequisites
- Ensure you have a Unix-based system (Linux/macOS) with Bash installed.
- Make sure the required scripts are available in the appropriate directory.
- Grant execute permission to the scripts using:
  ```
  chmod +x setup_backend_service.sh health_check.sh log_analysis.sh
  ```

## Running the First Script
1. Navigate to the directory containing the script:
   ```
   cd /path/to/scripts
   ```
2. Run the script using:
   ```
   ./setup_backend_service.sh <absolute_backend_path> <docker_image>
   ```
3. The script will check the server status and restart if necessary.
4. Log output will be recorded in the specified log file.

## Running the Second Script
1. Ensure the log file is present in the expected location.
2. Navigate to the script directory:
   ```
   cd /path/to/scripts
   ```
3. Run the scripts:
   ```
   ./health_check.sh
   ./log_analysis.sh <path_to_access.log_file>
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
docker compose up --build

# Stop all services
docker compose down
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
#Assignment 2

# Task 1: Kubernetes Deployment with GitOps

This task involves deploying a Node.js backend, a Vite frontend, and MongoDB into a Kubernetes cluster using GitOps principles. You will create the necessary Kubernetes manifests for deploying the application and manage deployments using Git-based version control. The task also includes configuring Ingress for external access to the application.

## Prerequisites

Before starting Task 1, ensure the following tools and setup:

- **Kubernetes Cluster**: A Kubernetes cluster running (local or cloud-based). Use `kubectl` to interact with it.
- **Docker**: Docker should be installed and configured to build and run containers.
- **Kubectl**: A command-line tool to interact with Kubernetes clusters.
- **Ingress Controller**: An Nginx Ingress Controller set up on your Kubernetes cluster.
- **GitOps Tool**: If using GitOps for deployments (e.g., ArgoCD, Flux), ensure it's installed and connected to your Git repository.
- **Node.js & MongoDB Docker Images**: The Node.js backend and MongoDB should be Dockerized.

## Setup Instructions
**Step 1: Clone the Repository**

Clone the project repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```
**Step 2: Configure Kubernetes Manifests**

The Kubernetes manifests for deploying the backend, frontend, and MongoDB are located in the kubernetes/ directory. Ensure that the following components are configured correctly:
ConfigMap for application settings.
Secret for sensitive data like database credentials.
Deployments for backend and frontend applications.
Services to expose the backend and frontend to the Kubernetes cluster.
Ingress to enable external access to the application.

```bash
cd kubernetes
```
The folder structure should look like this:

**kubernetes/
├── dev/
│   ├── backend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── ingress.yaml
│   ├── frontend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── ingress.yaml
│   └── mongo/
│       ├── statefulset.yaml
│       └── service.yaml
├── prod/
│   ├── backend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── ingress.yaml
│   ├── frontend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── ingress.yaml
│   └── mongo/
│       ├── statefulset.yaml
│       └── service.yaml
└── shared/
    ├── configmap.yaml
    └── secret.yaml**

**Step 3: Create a Namespace**
Create a namespace in your Kubernetes cluster to isolate the resources for the application:
```bash
kubectl create namespace dev
```
**Step 4: Apply Kubernetes Manifests**

Deploy the application resources into the dev namespace:

```bash
kubectl apply -n dev -f kubernetes/shared/
kubectl apply -n dev -f kubernetes/dev/mongo/
kubectl apply -n dev -f kubernetes/dev/frontend/
kubectl apply -n dev -f kubernetes/dev/backend/
```
**Step 5: Check Pod Status**
Ensure all pods are running correctly:
```bash
kubectl get pods -n dev
```
You should see the pods for the backend, frontend, and MongoDB services.

**Step 6: Configure Ingress**
The Ingress resources are configured to expose the frontend and backend applications. Verify that the Ingress is properly set up:
```bash
kubectl get ingress -n dev
```
Make sure the Ingress controllers are routing the traffic to the correct services.

**Step 7: Access the Application**
Once the deployment is successful, you can access the frontend and backend applications using the configured Ingress hostnames:

Frontend: dev-frontend.bookstore.local

Backend: dev-backend.bookstore.local

Ensure your /etc/hosts file is updated with the Ingress controller's IP address (e.g., 192.168.49.2):

```bash
192.168.49.2 dev-frontend.bookstore.local dev-backend.bookstore.local
```
Step 8: Troubleshoot
If there are issues during the deployment or if pods are not running as expected, check the logs for individual pods to debug:
```bash
kubectl logs -n dev <pod-name>
kubectl get pods -n ingress-nginx
kubectl get ingress -n dev
kubectl get svc -n prod


```









### Workflow Configuration File
- The CI pipeline configuration file is located at `.github/workflows/ci.yml`.


