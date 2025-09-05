# Deployment & Configuration Guide

This guide covers production deployment strategies, configuration management, and operational procedures for the Portal application.

## 🚀 Deployment Overview

The Portal supports multiple deployment strategies:
- **Docker** - Containerized deployment (recommended)
- **Node.js** - Direct server deployment
- **Static Export** - CDN/static hosting (limited functionality)

## 🐳 Docker Deployment (Recommended)

### Production Docker Setup

1. **Build Production Image**
   ```bash
   # Build optimized production image
   docker build -t portal:latest .
   
   # Multi-stage build with specific Node version
   docker build --target production -t portal:v1.0.0 .
   ```

2. **Run Container**
   ```bash
   # Basic run
   docker run -d \
     --name portal-app \
     -p 3000:3000 \
     -v /path/to/data:/app/data \
     portal:latest

   # With environment variables
   docker run -d \
     --name portal-app \
     -p 3000:3000 \
     -e NODE_ENV=production \
     -e DATABASE_PATH=/app/data/db.json \
     -v /path/to/data:/app/data \
     portal:latest
   ```

3. **Docker Compose Setup**
   ```yaml
   # docker-compose.yml
   version: '3.8'
   
   services:
     portal:
       build: .
       container_name: portal-app
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
         - DATABASE_PATH=/app/data/db.json
         - AUTH_SECRET=${AUTH_SECRET}
       volumes:
         - ./data:/app/data
         - ./logs:/app/logs
       restart: unless-stopped
       healthcheck:
         test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
         interval: 30s
         timeout: 10s
         retries: 3
         start_period: 40s

     nginx:
       image: nginx:alpine
       container_name: portal-nginx
       ports:
         - "80:80"
         - "443:443"
       volumes:
         - ./nginx.conf:/etc/nginx/nginx.conf
         - ./ssl:/etc/ssl/certs
       depends_on:
         - portal
       restart: unless-stopped
   ```

4. **Start with Docker Compose**
   ```bash
   # Development
   docker-compose up -d

   # Production
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Dockerfile Optimization

```dockerfile
# Multi-stage Dockerfile for production
FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "server.js"]
```

## 🖥️ Node.js Direct Deployment

### Server Requirements
- **Node.js**: 18+ (20+ recommended)
- **pnpm**: 9+
- **Memory**: 2GB minimum, 4GB+ recommended
- **Storage**: 10GB+ for application and data
- **OS**: Ubuntu 20.04+, CentOS 8+, or similar

### Production Setup

1. **Server Preparation**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Node.js 20
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install pnpm
   npm install -g pnpm

   # Create application user
   sudo adduser portal
   sudo usermod -aG sudo portal
   ```

2. **Application Deployment**
   ```bash
   # Switch to app user
   sudo su - portal

   # Clone repository
   git clone <repository-url> /home/portal/app
   cd /home/portal/app

   # Install dependencies
   pnpm install --frozen-lockfile

   # Copy production environment
   cp .env.production .env.local

   # Build application
   NODE_ENV=production pnpm build

   # Set up data directory
   mkdir -p /home/portal/data
   cp app/db/db.json /home/portal/data/
   ```

3. **Process Management with PM2**
   ```bash
   # Install PM2
   pnpm add -g pm2

   # Create ecosystem file
   cat > ecosystem.config.js << EOF
   module.exports = {
     apps: [{
       name: 'portal',
       script: '.next/standalone/server.js',
       env: {
         NODE_ENV: 'production',
         PORT: 3000,
         DATABASE_PATH: '/home/portal/data/db.json'
       },
       instances: 'max',
       exec_mode: 'cluster',
       error_file: '/home/portal/logs/error.log',
       out_file: '/home/portal/logs/access.log',
       log_file: '/home/portal/logs/combined.log',
       time: true
     }]
   }
   EOF

   # Start application
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

### Reverse Proxy Setup (Nginx)

1. **Install Nginx**
   ```bash
   sudo apt install nginx
   ```

2. **Configure Nginx**
   ```nginx
   # /etc/nginx/sites-available/portal
   server {
       listen 80;
       server_name your-domain.com;
       
       # Redirect HTTP to HTTPS
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name your-domain.com;

       # SSL Configuration
       ssl_certificate /etc/ssl/certs/portal.crt;
       ssl_certificate_key /etc/ssl/private/portal.key;
       ssl_protocols TLSv1.2 TLSv1.3;
       ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;

       # Security Headers
       add_header X-Frame-Options DENY;
       add_header X-Content-Type-Options nosniff;
       add_header X-XSS-Protection "1; mode=block";
       add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

       # Proxy to Next.js
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }

       # Static files
       location /_next/static {
           proxy_pass http://localhost:3000;
           add_header Cache-Control "public, max-age=31536000, immutable";
       }

       # File uploads
       client_max_body_size 10M;

       # Logs
       access_log /var/log/nginx/portal.access.log;
       error_log /var/log/nginx/portal.error.log;
   }
   ```

3. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/portal /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

## ⚙️ Environment Configuration

### Environment Variables

**Production Environment File (`.env.production`)**
```bash
# Application
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0

# Database
DATABASE_PATH=/app/data/db.json

# Authentication
AUTH_SECRET=your-super-secure-secret-key
AUTH_URL=https://your-domain.com

# External APIs
NEXT_PUBLIC_API_BASE_URL=https://your-domain.com/api

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true

# Logging
LOG_LEVEL=info
LOG_FILE=/app/logs/application.log

# Security
CSRF_SECRET=another-secure-secret
SESSION_TIMEOUT=3600

# File Upload
MAX_FILE_SIZE=10485760  # 10MB
UPLOAD_PATH=/app/uploads

# Performance
CACHE_ENABLED=true
CACHE_TTL=3600
```

### Configuration Management

1. **Environment-Specific Configs**
   ```bash
   configs/
   ├── .env.development
   ├── .env.staging
   ├── .env.production
   └── .env.example
   ```

2. **Configuration Loading**
   ```typescript
   // app/lib/config.ts
   export const config = {
     nodeEnv: process.env.NODE_ENV ?? 'development',
     port: parseInt(process.env.PORT ?? '3000'),
     database: {
       path: process.env.DATABASE_PATH ?? './app/db/db.json',
     },
     auth: {
       secret: process.env.AUTH_SECRET,
       url: process.env.AUTH_URL,
     },
     features: {
       analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
       notifications: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === 'true',
     },
   };
   ```

## 📊 Monitoring and Logging

### Application Monitoring

1. **Health Check Endpoint**
   ```typescript
   // app/api/health/route.ts
   export async function GET() {
     try {
       // Check database connectivity
       const dbStatus = await checkDatabase();
       
       // Check external dependencies
       const externalStatus = await checkExternalServices();

       return Response.json({
         status: 'healthy',
         timestamp: new Date().toISOString(),
         checks: {
           database: dbStatus,
           external: externalStatus,
         }
       });
     } catch (error) {
       return Response.json(
         { status: 'unhealthy', error: error.message },
         { status: 503 }
       );
     }
   }
   ```

2. **Metrics Collection**
   ```typescript
   // app/lib/metrics.ts
   export function trackMetrics() {
     // Performance metrics
     const observer = new PerformanceObserver((list) => {
       list.getEntries().forEach((entry) => {
         console.log(`${entry.name}: ${entry.duration}ms`);
       });
     });
     
     observer.observe({ entryTypes: ['navigation', 'resource'] });
   }
   ```

### Logging Setup

1. **Winston Logger Configuration**
   ```typescript
   // app/lib/logger.ts
   import winston from 'winston';

   export const logger = winston.createLogger({
     level: process.env.LOG_LEVEL ?? 'info',
     format: winston.format.combine(
       winston.format.timestamp(),
       winston.format.errors({ stack: true }),
       winston.format.json()
     ),
     transports: [
       new winston.transports.File({ 
         filename: 'logs/error.log', 
         level: 'error' 
       }),
       new winston.transports.File({ 
         filename: 'logs/combined.log' 
       }),
     ],
   });

   if (process.env.NODE_ENV !== 'production') {
     logger.add(new winston.transports.Console({
       format: winston.format.simple()
     }));
   }
   ```

### Log Rotation

```bash
# /etc/logrotate.d/portal
/home/portal/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 portal portal
    postrotate
        pm2 reload portal
    endscript
}
```

## 🔒 Security Configuration

### SSL/TLS Setup

1. **Let's Encrypt with Certbot**
   ```bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx

   # Obtain certificate
   sudo certbot --nginx -d your-domain.com

   # Auto-renewal
   sudo crontab -e
   # Add: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

2. **Manual SSL Certificate**
   ```bash
   # Generate CSR
   openssl req -new -newkey rsa:2048 -nodes \
     -keyout portal.key -out portal.csr

   # Install certificate files
   sudo cp portal.crt /etc/ssl/certs/
   sudo cp portal.key /etc/ssl/private/
   sudo chmod 600 /etc/ssl/private/portal.key
   ```

### Firewall Configuration

```bash
# UFW setup
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw deny 3000/tcp  # Block direct access to app
```

### Security Headers

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'pnpm'
    
    - name: Install pnpm
      run: npm install -g pnpm
    
    - name: Install dependencies
      run: pnpm install --frozen-lockfile
    
    - name: Run tests
      run: pnpm test
    
    - name: Build application
      run: pnpm build
    
    - name: Build Docker image
      run: docker build -t portal:${{ github.sha }} .
    
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.7
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /home/portal/app
          git pull origin main
          pnpm install --frozen-lockfile
          pnpm build
          pm2 reload portal
```

## 📈 Performance Optimization

### Production Optimizations

1. **Next.js Configuration**
   ```typescript
   // next.config.ts
   const nextConfig = {
     output: 'standalone',
     experimental: {
       optimizeCss: true,
     },
     images: {
       formats: ['image/webp', 'image/avif'],
     },
     compress: true,
     poweredByHeader: false,
   };
   ```

2. **Database Optimization**
   ```typescript
   // For file-based database
   export async function optimizeDatabase() {
     // Implement database compaction
     // Add indexes for frequently queried fields
     // Set up backup rotation
   }
   ```

### Caching Strategy

```nginx
# Nginx caching configuration
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=portal_cache:10m max_size=1g;

location /api/ {
    proxy_cache portal_cache;
    proxy_cache_valid 200 10m;
    proxy_cache_key "$scheme$request_method$host$request_uri";
    add_header X-Cache-Status $upstream_cache_status;
}
```

## 🔧 Maintenance Procedures

### Backup Strategy

1. **Database Backup**
   ```bash
   #!/bin/bash
   # backup.sh
   DATE=$(date +%Y%m%d_%H%M%S)
   cp /home/portal/data/db.json /home/portal/backups/db_$DATE.json
   
   # Keep only last 30 days
   find /home/portal/backups -name "db_*.json" -mtime +30 -delete
   ```

2. **Application Backup**
   ```bash
   # Full application backup
   tar -czf portal_backup_$DATE.tar.gz \
     /home/portal/app \
     /home/portal/data \
     /home/portal/logs
   ```

### Update Procedures

1. **Application Updates**
   ```bash
   # Update script
   #!/bin/bash
   cd /home/portal/app
   
   # Backup current version
   cp -r . ../backup_$(date +%Y%m%d)
   
   # Pull updates
   git pull origin main
   
   # Install dependencies
   pnpm install --frozen-lockfile
   
   # Build application
   pnpm build
   
   # Reload application
   pm2 reload portal
   ```

2. **System Updates**
   ```bash
   # Monthly system maintenance
   sudo apt update && sudo apt upgrade -y
   sudo apt autoremove -y
   sudo apt autoclean
   
   # Update Node.js (if needed)
   # npm install -g n
   # n latest
   ```

This deployment guide ensures a robust, secure, and scalable production environment for the Portal application.