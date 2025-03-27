#!/bin/bash
# Install Python dependencies
echo "Installing Python dependencies..."

apt-get update && apt-get install -y \
  libgstreamer-gl1.0-0 \
  libgstreamer-plugins-bad1.0-0 \
  libavif15 \
  libenchant-2-2 \
  libsecret-1-0 \
  libmanette-0.2-0 \
  libgles2


# # Install uv
# pip install uv

# # Create virtual environment
# uv venv

# Install dependencies from requirements.txt
pip install -r requirements.txt
pip install --upgrade openai

playwright install

echo "Setup complete!"


