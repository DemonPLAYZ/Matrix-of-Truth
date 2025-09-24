@echo off
echo.
echo 🐳 Matrix of Truth - Docker Setup Verification
echo ==============================================

echo.
echo 📁 Checking required files...

if exist "Dockerfile" (
    echo ✅ Dockerfile exists
) else (
    echo ❌ Dockerfile missing
)

if exist ".dockerignore" (
    echo ✅ .dockerignore exists
) else (
    echo ❌ .dockerignore missing
)

if exist "requirements-docker.txt" (
    echo ✅ requirements-docker.txt exists
) else (
    echo ❌ requirements-docker.txt missing
)

if exist "main.py" (
    echo ✅ main.py exists
) else (
    echo ❌ main.py missing
)

if exist ".env" (
    echo ✅ .env file exists
) else (
    echo ❌ .env file missing - copy .env.docker to .env and fill in your values
)

echo.
echo 🐳 Checking Docker availability...
docker --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Docker is installed
    docker --version
) else (
    echo ❌ Docker is not installed
    echo    Please install Docker Desktop first
)

echo.
echo 🚀 Next Steps:
echo 1. Install Docker Desktop if not already installed
echo 2. Copy .env.docker to .env and fill in your API keys
echo 3. Test locally: docker build -t matrix-backend .
echo 4. Follow DEPLOY_GUIDE.md for Render deployment

echo.
echo 📚 Files created for deployment:
echo    - Dockerfile (multi-stage build)
echo    - docker-compose.yml (local testing)
echo    - .dockerignore (optimization)
echo    - requirements-docker.txt (streamlined deps)
echo    - .env.docker (environment template)
echo    - DEPLOY_GUIDE.md (deployment instructions)
echo    - render.yaml (Render configuration reference)

pause