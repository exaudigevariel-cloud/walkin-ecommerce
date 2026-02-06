# 🚂 RAILWAY DEPLOYMENT GUIDE - AMAN & SECURE

## 🔒 Cara Set Password AMAN di Railway

### **Masalah:**
❌ Jika password di `server.js` → diupload ke GitHub → **SEMUA ORANG BISA LIHAT!**

### **Solusi:**
✅ Gunakan **Environment Variables** di Railway Dashboard!

---

## 📋 Step-by-Step Deploy ke Railway

### **Step 1: Set Environment Variables di Railway**

1. **Login ke Railway:** https://railway.app
2. **Select your project** (walkin-ecommerce)
3. **Click tab "Variables"** (di menu atas)
4. **Add New Variable:**

```
Variable Name: ADMIN_EMAIL
Value: your-secure-email@domain.com
```

**Klik "Add"**

```
Variable Name: ADMIN_PASSWORD  
Value: YourVeryStrongPassword123!
```

**Klik "Add"**

5. **DONE!** Password AMAN, tidak ada di code! ✅

---

### **Step 2: Code Sudah Siap (Sudah Saya Update!)**

File `server.js` sekarang sudah aman:

```javascript
// Di Railway, ambil dari Environment Variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@walkin.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
```

**Cara Kerja:**
- ✅ Di Railway: Baca dari Environment Variables (AMAN!)
- ✅ Di Local: Pakai default (untuk development)

---

### **Step 3: Deploy ke Railway**

#### **Option A: Via GitHub (Recommended)**

1. **Push code ke GitHub:**
   ```bash
   git add .
   git commit -m "Update: use environment variables for security"
   git push
   ```

2. **Connect Railway ke GitHub:**
   - Railway Dashboard → New Project
   - Deploy from GitHub repo
   - Select: `walkin-ecommerce`
   - Railway akan auto-deploy! ✅

3. **Railway akan otomatis:**
   - Detect `package.json`
   - Run `npm install`
   - Run `npm start` (atau `node server.js`)

#### **Option B: Via Railway CLI**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

---

### **Step 4: Verify Environment Variables**

**Check di Railway Dashboard:**

1. Go to: Variables tab
2. Pastikan ada:
   - ✅ `ADMIN_EMAIL` = your-email@domain.com
   - ✅ `ADMIN_PASSWORD` = your-strong-password

**JANGAN ada di code!**

---

## 🔐 Security Best Practices

### ✅ DO (Lakukan):
- ✅ Set password di Railway Variables
- ✅ Gunakan strong password (min 12 karakter)
- ✅ Include: huruf besar, kecil, angka, simbol
- ✅ Upload code ke GitHub
- ✅ Keep `.env` in `.gitignore`

### ❌ DON'T (Jangan):
- ❌ Hardcode password di `server.js`
- ❌ Commit `.env` file ke Git
- ❌ Share password di chat/email
- ❌ Use simple passwords (`admin123`, `password`)

---

## 🧪 Testing After Deploy

1. **Get Railway URL:**
   - Railway Dashboard → Deployments
   - Copy URL: `https://walkin-ecommerce-production.up.railway.app`

2. **Test Admin Login:**
   - Go to: `https://YOUR-URL.railway.app/admin.html`
   - Login dengan:
     - Email: Yang di Railway Variables
     - Password: Yang di Railway Variables

3. **If login fails:**
   - Check Railway Variables spelling
   - Check ADMIN_EMAIL & ADMIN_PASSWORD ada
   - Redeploy: Railway → Settings → Redeploy

---

## 📁 File Structure (Security Check)

**✅ Safe to commit to GitHub:**
```
✅ server.js (no passwords!)
✅ package.json
✅ public/
✅ README.md
✅ .gitignore
```

**❌ NEVER commit:**
```
❌ .env (local secrets)
❌ node_modules/ (too large)
❌ data/products.json (your real data)
❌ uploads/* (uploaded images)
```

---

## 🔄 Update Password di Railway

**Jika ingin ganti password:**

1. Railway Dashboard → Variables
2. Click `ADMIN_PASSWORD`
3. Update value → Save
4. Railway akan auto-redeploy

**TIDAK perlu edit code!** ✅

---

## 🌐 Railway Configuration

### **Auto-Detect (Railway Smart!)**

Railway akan otomatis:
- ✅ Detect Node.js project
- ✅ Install dependencies
- ✅ Run start command
- ✅ Expose port
- ✅ Provide HTTPS

### **Custom Configuration (Optional)**

Create `railway.json`:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node server.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## 🗄️ Database di Railway

**Current:** JSON file (tidak persisten di Railway!)

**Upgrade ke PostgreSQL:**

1. **Railway Dashboard → Add Service**
2. **Select: PostgreSQL**
3. **Railway akan provide:**
   - `DATABASE_URL` environment variable
   - Connection string

4. **Update code untuk use PostgreSQL**
   ```bash
   npm install pg
   ```

5. **In server.js:**
   ```javascript
   const { Pool } = require('pg');
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
     ssl: { rejectUnauthorized: false }
   });
   ```

---

## 💰 Railway Pricing

**Free Tier:**
- ✅ $5 free credit/month
- ✅ Enough for small projects
- ✅ Auto-scale
- ✅ Custom domains

**If over limit:**
- Pause unused services
- Optimize resource usage
- Upgrade plan ($5/month)

---

## 🚀 Complete Deployment Checklist

- [ ] Code updated (server.js uses env vars) ✅
- [ ] Pushed to GitHub
- [ ] Railway project created
- [ ] GitHub repo connected to Railway
- [ ] Environment Variables set:
  - [ ] ADMIN_EMAIL
  - [ ] ADMIN_PASSWORD
- [ ] Auto-deploy enabled
- [ ] Custom domain added (optional)
- [ ] Test admin login works
- [ ] Test product upload works
- [ ] Test customer checkout works

---

## 📞 Troubleshooting

### "Cannot read environment variables"
**Fix:** 
- Check Variables tab di Railway
- Make sure variable names EXACT (case-sensitive)
- Redeploy after adding variables

### "Build failed"
**Fix:**
- Check Railway logs
- Make sure `package.json` is correct
- Try manual start command: `node server.js`

### "Admin login not working"
**Fix:**
- Verify ADMIN_EMAIL & ADMIN_PASSWORD in Variables
- Check for typos
- Try with default values (admin@walkin.com / admin123)

---

## 🎉 You're Done!

Sekarang password Anda:
- ✅ AMAN (tidak di code)
- ✅ RAHASIA (hanya di Railway)
- ✅ MUDAH diganti (tanpa edit code)

**Website live di:** `https://your-project.up.railway.app` 🚀

---

## 🔗 Useful Links

- Railway Dashboard: https://railway.app/dashboard
- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway

---

**Next:** Add custom domain di Railway Settings → Domains! 🌐
