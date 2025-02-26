#!/bin/bash

SERVICE_NAME="mentorship-platform"
LOG_FILE="/var/log/mentorship-health.log"

# Check if the service is running
if ! systemctl is-active --quiet "$SERVICE_NAME"; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $SERVICE_NAME is down. Restarting..." | tee -a "$LOG_FILE"
    sudo systemctl restart "$SERVICE_NAME"

    # Check again if it restarted successfully
    if systemctl is-active --quiet "$SERVICE_NAME"; then
        echo "$(date '+%Y-%m-%d %H:%M:%S') - Successfully restarted $SERVICE_NAME" | tee -a "$LOG_FILE"
    else
        echo "$(date '+%Y-%m-%d %H:%M:%S') - Failed to restart $SERVICE_NAME" | tee -a "$LOG_FILE"
    fi
else
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $SERVICE_NAME is running fine." | tee -a "$LOG_FILE"
fi