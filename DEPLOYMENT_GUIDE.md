# Therapy By Rashi - Deployment Guide

## 🚀 Deployment Checklist

### ✅ Phase 1: GitHub (COMPLETED)
- [x] Repository created at: https://github.com/jontykaran/therapy-website
- [x] Code pushed to main branch

---

## 📱 Phase 2: Frontend Deployment (Netlify)

### Steps:
1. **Go to https://netlify.com**
2. **Click "Add new site" → "Import an existing project"**
3. **Select GitHub provider** and authorize
4. **Select repository**: jontykaran/therapy-website
5. **Build settings:**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```
6. **Click "Deploy"**
7. **Wait for deployment** (2-3 minutes)
8. **Copy your Netlify URL** (e.g., https://your-site.netlify.app)

### Environment Variables (Add AFTER Railway is ready):
- Key: `VITE_API_URL`
- Value: `https://your-railway-backend.railway.app` (add after backend deploys)

### Result:
- ✅ Frontend URL: `https://your-site.netlify.app`
- ✅ Auto-redeploys on every GitHub push

---

## 🗄️ Phase 3: Backend Deployment (Railway)

### Step 1: Create PostgreSQL Database
1. **Go to https://railway.app**
2. **Sign up/Login** (create free account)
3. **Create New Project**
4. **Select "Database" → "PostgreSQL"**
5. **Railway will create database automatically**
6. **Copy connection details** (you'll see them in the dashboard)

### Step 2: Deploy Spring Boot Backend
1. **Click "Create New" → "GitHub Repo"**
2. **Authorize GitHub** and select: `jontykaran/therapy-website`
3. **Railway will auto-detect Spring Boot app**
4. **Set these in Railway Settings:**
   - **Root Directory**: `backend`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/*.jar`

### Step 3: Add Environment Variables to Railway
In Railway dashboard, go to Variables and add:

```
# Database (Railway auto-provides these, copy from PostgreSQL service)
SPRING_DATASOURCE_URL=jdbc:postgresql://HOST:PORT/railway
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=YOUR_PASSWORD

# Email (Your Outlook credentials)
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-16-char-app-password
NOTIFICATION_EMAIL=your-email@outlook.com

# CORS (Update with your Netlify URL once deployed)
CORS_ORIGINS=https://your-netlify-site.netlify.app
```

### Step 4: Deploy
- Click **Deploy**
- Wait for build to complete (5-7 minutes)
- Copy your Railway API URL (e.g., https://therapy-api-prod.railway.app)

### Result:
- ✅ Backend URL: `https://therapy-api-prod.railway.app`
- ✅ PostgreSQL Database connected
- ✅ Email configured
- ✅ CORS enabled

---

## 🔗 Phase 4: Connect Frontend to Backend

1. **Go back to Netlify**
2. **Site Settings → Build & Deploy → Environment**
3. **Update `VITE_API_URL`**: `https://your-railway-backend.railway.app`
4. **Save** - Netlify will auto-redeploy

---

## ✅ Phase 5: Testing

### Test Frontend:
- ✅ Visit: https://your-netlify-site.netlify.app
- ✅ Check logo in navbar and footer
- ✅ Navigate all pages (Home, About, Contact, FAQ)
- ✅ Test responsive design on mobile

### Test Backend:
- ✅ Health check: `https://your-railway-backend.railway.app/actuator/health`
- ✅ Should return: `{"status":"UP"}`

### Test Contact Form:
- ✅ Fill out contact form on website
- ✅ Click "Send Message"
- ✅ Check your Outlook inbox for confirmation email
- ✅ Check Railway logs for email sending confirmation

---

## 📋 Important Notes

- **Database**: Railway PostgreSQL is free tier included
- **Email**: Outlook SMTP is free
- **Frontend**: Netlify free tier (100 GB bandwidth/month)
- **Backend**: Railway free tier ($5 credit/month)
- **Auto-redeploy**: Netlify auto-redeploys on GitHub push
- **Environment Variables**: Keep secure, never commit `.env` to Git

---

## 🔐 Security Checklist

- [ ] Don't expose API keys in frontend code
- [ ] Use environment variables for all secrets
- [ ] CORS is restricted to your Netlify domain only
- [ ] Database password is secure
- [ ] Email app password (not main password) is used

---

## 📊 Shared Testing URL

Once deployed, share this with testers:
```
https://your-netlify-site.netlify.app
```

They can:
- Browse your therapy website
- Fill out contact form
- See email confirmation

---

## 🆘 Troubleshooting

### Frontend shows "API not found"
→ Update `VITE_API_URL` in Netlify environment variables

### Contact form doesn't send email
→ Check Railway environment variables (SMTP_USER, SMTP_PASSWORD)
→ Check Railway logs for email errors

### Backend gives 404 errors
→ Check `CORS_ORIGINS` matches your Netlify URL
→ Restart Railway deployment

### Database connection fails
→ Copy connection string from Railway PostgreSQL service
→ Update `SPRING_DATASOURCE_URL` in environment variables

---

## 📞 Support

For issues, check:
1. **Netlify Logs**: Site Settings → Deploys
2. **Railway Logs**: Click on service → View Logs
3. **Backend Health**: `https://your-backend/actuator/health`

