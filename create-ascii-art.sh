#!/bin/bash
# Script to create ASCII art using Droid CLI
# This demonstrates how to use `droid exec` with --auto low for safe file creation

set -e

# Check if Droid CLI is installed
if ! command -v droid &> /dev/null; then
    echo "Installing Droid CLI..."
    curl -fsSL https://app.factory.ai/cli | sh
    export PATH="/usr/local/bin:$PATH"
fi

# Check if FACTORY_API_KEY is set
if [ -z "$FACTORY_API_KEY" ]; then
    echo "Error: FACTORY_API_KEY environment variable is not set"
    echo "Please set it with: export FACTORY_API_KEY=your_api_key"
    exit 1
fi

# Verify Droid CLI installation
echo "Verifying Droid CLI installation..."
droid --version

# Use droid exec to create ASCII art
# --auto low: Safe operations for file creation (low-risk, easily reversible)
echo "Creating ASCII art file using droid exec..."
droid exec --auto low "Create a new file called 'ascii-art.txt' with creative ASCII art. The ASCII art should be a robot or droid character with the word 'DROID' incorporated into the design. Make it fun and visually appealing with good use of ASCII characters."

echo "✅ ASCII art file created successfully!"
echo "View it with: cat ascii-art.txt"
