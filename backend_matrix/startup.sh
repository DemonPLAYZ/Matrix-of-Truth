#!/bin/bash

# startup.sh - Optimized startup script for Render deployment

set -e

echo "Starting Matrix of Truth Backend..."
echo "Environment: ${RENDER_SERVICE_NAME:-local}"
echo "Port: ${PORT:-8000}"

# Set Python path
export PYTHONPATH="/app:$PYTHONPATH"

# Create necessary directories
mkdir -p /app/log /app/craap_results /app/craap_results_v2

# Download NLTK data if needed (minimal set)
python -c "
import nltk
import os
try:
    nltk.data.find('tokenizers/punkt')
    print('NLTK punkt tokenizer already available')
except LookupError:
    print('Downloading NLTK punkt tokenizer...')
    nltk.download('punkt', quiet=True)
    print('NLTK punkt tokenizer downloaded successfully')
"

# Pre-warm the application by importing heavy modules
echo "Pre-warming application modules..."
python -c "
print('Loading heavy imports...')
try:
    import torch
    print('✓ PyTorch loaded')
except ImportError:
    print('⚠ PyTorch not available')

try:
    import tensorflow as tf
    tf.config.set_visible_devices([], 'GPU')  # Disable GPU if not available
    print('✓ TensorFlow loaded')
except ImportError:
    print('⚠ TensorFlow not available')

try:
    import transformers
    print('✓ Transformers loaded')
except ImportError:
    print('⚠ Transformers not available')

print('Pre-warming complete')
"

echo "Starting FastAPI application..."

# Start the application with optimized settings
exec python -m uvicorn main:app \
    --host 0.0.0.0 \
    --port ${PORT:-8000} \
    --workers 1 \
    --loop uvloop \
    --http httptools \
    --access-log \
    --no-use-colors