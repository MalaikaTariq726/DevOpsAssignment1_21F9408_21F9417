#!/bin/bash

# Exit if any command fails
set -e

if [[ "$#" -lt 2 ]]; then
    echo "❌ Usage: sudo ./setup_backend_service.sh <absolute_backend_path> <docker_image>"
    echo "Example: sudo ./setup_backend_service.sh ./mentorship-platform-backend mentorship-platform-backend-image"
    exit 1
fi

BACKEND_DIR="$1"
BACKEND_IMAGE="$2"
BACKEND_PORT=7373

echo "Select deployment mode:"
echo "1) Local (runs Node.js directly)"
echo "2) Docker (runs backend as a container)"
read -p "Enter choice (1 or 2): " mode

if [[ "$mode" != "1" && "$mode" != "2" ]]; then
    echo "❌ Invalid choice. Exiting."
    exit 1
fi

# =============================
# LOCAL SETUP (Without Docker)
# =============================
if [[ "$mode" == "1" ]]; then
    echo "🔹 Setting up Backend in LOCAL mode..."

    # Ensure the backend directory exists
    if [[ ! -d "$BACKEND_DIR" ]]; then
        echo "❌ Backend directory not found at $BACKEND_DIR!"
        exit 1
    fi

    # Install Node.js if not installed
    if ! command -v node &> /dev/null; then
        echo "🔹 Installing Node.js..."
        sudo apt update
        sudo apt install -y nodejs npm
    fi

    # Install npm if not installed
    if ! command -v npm &> /dev/null; then
        echo "❌ npm is not installed. Install it and try again."
        exit 1
    fi

    # Install dependencies
    echo "🔹 Installing project dependencies..."
    cd "$BACKEND_DIR"
    npm install

    # Create systemd service
    echo "📝 Creating systemd service..."
    sudo tee /etc/systemd/system/mentorship-platform.service > /dev/null <<EOF
[Unit]
Description=Mentorship Platform Backend (Local)
After=network.target

[Service]
ExecStart=/usr/bin/npm run dev
Restart=always
User=nobody
Group=nogroup
Environment=NODE_ENV=production
WorkingDirectory=$BACKEND_DIR
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

    echo "✅ Local backend service created."

# =============================
# DOCKER SETUP
# =============================
elif [[ "$mode" == "2" ]]; then
    # Check if Docker is installed **only for Docker mode**
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker is not installed! Please install Docker first."
        exit 1
    fi

    echo "🔹 Setting up Backend in DOCKER mode..."

    # Check if Docker image exists locally
    if [[ "$(docker images -q $BACKEND_IMAGE 2> /dev/null)" == "" ]]; then
        echo "❌ Error: Docker image '$BACKEND_IMAGE' not found locally."

        # Try pulling the image from Docker Hub
        echo "🔍 Attempting to pull image '$BACKEND_IMAGE'..."
        if ! docker pull "$BACKEND_IMAGE"; then
            echo "❌ Error: Unable to pull image '$BACKEND_IMAGE'. Please provide a valid image."
            exit 1
        fi
    fi

    # Create systemd service for Docker
    echo "📝 Creating systemd service..."
    sudo tee /etc/systemd/system/mentorship-platform.service > /dev/null <<EOF
[Unit]
Description=Mentorship Platform Backend (Docker)
After=network.target docker.service
Requires=docker.service

[Service]
Restart=always
ExecStartPre=-/usr/bin/docker rm -f mentorship-platform
ExecStart=/usr/bin/docker run --rm --name mentorship-platform -p $BACKEND_PORT:$BACKEND_PORT -d $BACKEND_IMAGE
ExecStop=/usr/bin/docker stop mentorship-platform

[Install]
WantedBy=multi-user.target
EOF

    echo "✅ Docker backend service created."
fi

# =============================
# COMMON STEPS FOR BOTH MODES
# =============================

# Reload systemd, enable, and start the service
echo "🔄 Reloading systemd and enabling the service..."
sudo systemctl daemon-reload
sudo systemctl enable mentorship-platform
sudo systemctl start mentorship-platform

echo "✅ Backend is running as a systemd service."

# Kernel Tuning - Adjust net.core.somaxconn
echo "🔹 Adjusting Kernel Parameters..."
sudo sysctl -w net.core.somaxconn=1024
echo "net.core.somaxconn=1024" | sudo tee -a /etc/sysctl.conf > /dev/null
sudo sysctl -p

echo "✅ Kernel tuning applied."

# Firewall Setup - Allow backend port
echo "🔹 Configuring UFW Firewall..."
sudo ufw allow "$BACKEND_PORT"/tcp
sudo ufw default deny incoming
sudo ufw enable

echo "✅ Firewall setup completed."

echo "🚀 Setup complete! Your backend is running in $([[ "$mode" == "1" ]] && echo 'LOCAL' || echo 'DOCKER') mode."