#!/bin/bash

# verify-docker-setup.sh - Verify Docker setup before deployment

echo "🐳 Matrix of Truth - Docker Setup Verification"
echo "=============================================="

# Check if required files exist
files=(
    "Dockerfile"
    ".dockerignore"
    "requirements-docker.txt"
    "main.py"
    ".env"
)

echo "📁 Checking required files..."
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

# Check if Docker is available (you'll run this after installing Docker)
echo -e "\n🐳 Checking Docker availability..."
if command -v docker &> /dev/null; then
    echo "✅ Docker is installed"
    docker --version
else
    echo "❌ Docker is not installed"
    echo "   Please install Docker Desktop first"
fi

# Validate Dockerfile syntax
echo -e "\n📋 Validating Dockerfile..."
if [ -f "Dockerfile" ]; then
    # Basic syntax check - look for required keywords
    if grep -q "FROM" Dockerfile && grep -q "COPY" Dockerfile && grep -q "CMD" Dockerfile; then
        echo "✅ Dockerfile appears to have valid structure"
    else
        echo "❌ Dockerfile may have syntax issues"
    fi
else
    echo "❌ Dockerfile not found"
fi

# Check environment file
echo -e "\n🔧 Checking environment configuration..."
if [ -f ".env" ]; then
    echo "✅ .env file exists"
    # Count non-empty, non-comment lines
    env_vars=$(grep -v '^#' .env | grep -v '^$' | wc -l)
    echo "   Found $env_vars environment variables"
else
    echo "❌ .env file missing"
    echo "   Create .env file with your API keys"
fi

# Estimate Docker image size (rough calculation)
echo -e "\n📦 Estimating requirements..."
if [ -f "requirements-docker.txt" ]; then
    req_count=$(grep -v '^#' requirements-docker.txt | grep -v '^$' | wc -l)
    echo "✅ Found $req_count Python packages"
    if [ $req_count -gt 50 ]; then
        echo "   ⚠️  Large number of dependencies - build may take time"
    fi
else
    echo "❌ requirements-docker.txt not found"
fi

echo -e "\n🚀 Next Steps:"
echo "1. Install Docker Desktop if not already installed"
echo "2. Copy your .env file to the backend_matrix directory"
echo "3. Test locally: docker build -t matrix-backend ."
echo "4. Follow DEPLOY_GUIDE.md for Render deployment"

echo -e "\n📚 Files created for deployment:"
echo "   - Dockerfile (multi-stage build)"
echo "   - docker-compose.yml (local testing)"
echo "   - .dockerignore (optimization)"
echo "   - requirements-docker.txt (streamlined deps)"
echo "   - DEPLOY_GUIDE.md (deployment instructions)"
echo "   - render.yaml (Render configuration reference)"