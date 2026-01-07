# ⚠️ IMPORTANT SECURITY NOTICE

## Default Admin Credentials

This repository contains **development-only default credentials** that are visible in the source code.

### Admin Account (Created by seed script)
- **Email**: `admin@module437.test`
- **Password**: `admin123456`

## 🚨 CRITICAL ACTIONS REQUIRED FOR PRODUCTION

1. **Delete or change the default admin account immediately**
2. **Generate a new JWT_SECRET** using:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
3. **Never use default credentials in production**
4. **Review and follow all guidelines in [SECURITY.md](SECURITY.md)**

## 📋 Pre-Deployment Checklist

Before deploying this application:

- [ ] Changed/removed default admin credentials
- [ ] Generated unique JWT_SECRET for production
- [ ] Configured MongoDB with authentication
- [ ] Set up HTTPS/TLS certificates
- [ ] Configured appropriate CORS origins (not `origin: true`)
- [ ] Implemented rate limiting
- [ ] Updated all npm packages
- [ ] Ran `npm audit` and fixed vulnerabilities
- [ ] Set `NODE_ENV=production`
- [ ] Configured proper logging
- [ ] Set up database backups

## 📖 Additional Resources

- Full security guidelines: [SECURITY.md](SECURITY.md)
- Deployment guide: [docs/deployment/DEPLOYMENT.md](docs/deployment/DEPLOYMENT.md)
- Setup instructions: [docs/SETUP.md](docs/SETUP.md)

## 🤝 Responsible Disclosure

If you discover a security vulnerability, please report it to:
**security@emirastic.com**

Do NOT open public issues for security vulnerabilities.

---

**This is a public repository with visible source code. All secrets and credentials shown are for development purposes only and must never be used in production.**
