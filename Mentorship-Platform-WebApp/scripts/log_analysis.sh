#!/bin/bash

# Check if a log file is provided
if [[ -z "$1" ]]; then
    echo "Usage: $0 <log_file>"
    exit 1
fi

LOG_FILE="$1"

# Count requests per IP and display the top 3
echo "📊 Top 3 IP addresses with the most requests:"
awk '{print $1}' "$LOG_FILE" | sort | uniq -c | sort -nr | head -3
