# Docker Deployment Guide for Render

This guide will help you deploy your Matrix of Truth backend to Render using Docker.

## Files Created

1. **Dockerfile** - Multi-stage Docker build for optimized deployment
2. **docker-compose.yml** - Local development and testing
3. **.dockerignore** - Excludes unnecessary files from Docker context
4. **requirements-docker.txt** - Optimized Python dependencies
5. **startup.sh** - Startup script for initialization
6. **render.yaml** - Render service configuration reference

## Local Testing (Optional)

Before deploying, you can test locally:

```bash
# Build the Docker image
docker build -t matrix-backend .

# Run the container
docker run -p 8000:8000 --env-file .env matrix-backend

# Or use docker-compose
docker-compose up --build
```

## Render Deployment Steps

### 1. Prepare Your Repository

Ensure all the Docker files are committed to your Git repository:

```bash
git add .
git commit -m "Add Docker configuration for Render deployment"
git push origin main
```

### 2. Create Render Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select your `Matrix-of-Truth` repository

### 3. Configure Service Settings

**Basic Settings:**
- **Name**: `matrix-of-truth-backend`
- **Environment**: `Docker`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `backend_matrix`

**Build & Deploy:**
- **Dockerfile Path**: `./Dockerfile` (relative to root directory)
- **Docker Context**: `./` (current directory)
- **Docker Command**: Leave empty (uses CMD from Dockerfile)

**Instance Type:**
- Start with "Starter" ($7/month)
- Upgrade if you need more resources

### 4. Environment Variables

Add these environment variables in Render dashboard:

**Required:**
- `PORT` - (automatically set by Render, don't override)
- `PYTHONPATH` - `/app`

**Your API Keys** (copy from your .env file):
- `FIREBASE_CONFIG` - Your Firebase configuration
- `PUSHER_APP_ID` - Pusher app ID
- `PUSHER_KEY` - Pusher key
- `PUSHER_SECRET` - Pusher secret
- `PUSHER_CLUSTER` - Pusher cluster
- `GROQ_API_KEY` - Groq API key
- `SERPER_API_KEY` - Serper API key
- `NEWSAPI_KEY` - NewsAPI key
- Add any other environment variables from your `.env` file

### 5. Advanced Settings

**Health Check:**
- **Path**: `/health`
- **Timeout**: 30 seconds

**Auto-Deploy:**
- Enable "Auto-Deploy" for main branch

### 6. Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your Docker image
3. Monitor the build logs for any issues
4. Once deployed, test your endpoints

## Testing Your Deployment

Once deployed, test these endpoints:

```bash
# Health check
curl https://your-service-name.onrender.com/health

# Basic functionality
curl https://your-service-name.onrender.com/

# Ready check
curl https://your-service-name.onrender.com/ready
```

## Optimization Features

The Docker setup includes several optimizations:

1. **Multi-stage build** - Reduces final image size
2. **Layer caching** - Faster rebuilds when code changes
3. **Minimal base image** - Python slim for security and size
4. **Non-root user** - Better security
5. **Health checks** - Automatic restart if unhealthy
6. **Optimized requirements** - Streamlined dependencies
7. **Pre-warming** - Heavy modules loaded at startup

## Troubleshooting

### Build Issues

1. **Out of memory during build:**
   - Use Render's higher-tier build instance
   - Or simplify requirements-docker.txt

2. **Dependencies not installing:**
   - Check requirements-docker.txt syntax
   - Ensure all API keys are set

### Runtime Issues

1. **Application startup timeout:**
   - Increase health check timeout in Render settings
   - Check logs for specific errors

2. **Memory issues:**
   - Upgrade to higher Render plan
   - Optimize model loading in your code

3. **File permissions:**
   - Docker runs as non-root user
   - Ensure code doesn't require root permissions

### Monitoring

- Use Render's built-in logging and metrics
- Health endpoint at `/health`
- Ready endpoint at `/ready` for quick checks

## Cost Optimization

1. **Use Starter plan** initially ($7/month)
2. **Enable auto-sleep** for development services
3. **Monitor resource usage** and upgrade only when needed
4. **Use persistent disk** for model files if needed

## Updates

To update your deployment:

1. Push changes to your main branch
2. Render will automatically rebuild and deploy
3. Monitor the deployment in Render dashboard

## Support

If you encounter issues:

1. Check Render's build and runtime logs
2. Test locally with Docker first
3. Verify all environment variables are set
4. Check that all required files are committed to Git