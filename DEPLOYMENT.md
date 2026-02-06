# 🚀 DEPLOYMENT GUIDE

## Quick Deploy (Otomatis)

### Langkah 1: Push ke GitHub

1. **Jalankan script otomatis:**
   ```
   Double-click: deploy-github.bat
   ```

2. **Script akan otomatis:**
   - ✅ Initialize Git repository
   - ✅ Add semua file
   - ✅ Create initial commit
   
3. **Anda perlu:**
   - Buat repository baru di GitHub: https://github.com/new
   - Nama repository: `walkin-ecommerce`
   - Copy URL repository (contoh: `https://github.com/USERNAME/walkin-ecommerce.git`)
   - Paste URL saat diminta oleh script

### Langkah 2: Deploy ke Vercel

1. **Jalankan script otomatis:**
   ```
   Double-click: deploy-vercel.bat
   ```

2. **Pilih Option 1 (Automated) atau Option 2 (Manual)**

---

## Manual Deploy (Step by Step)

### A. Push ke GitHub (Manual)

1. **Buka Command Prompt (CMD)**
   ```
   Win + R → ketik: cmd → Enter
   ```

2. **Navigate ke project folder**
   ```bash
   cd C:\Users\BRI\.gemini\antigravity\scratch\walkin-ecommerce
   ```

3. **Initialize Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Walkin e-commerce platform"
   ```

4. **Buat repository di GitHub**
   - Buka: https://github.com/new
   - Repository name: `walkin-ecommerce`
   - Description: "Full-stack e-commerce platform for sneakers"
   - Public/Private: Pilih sesuai keinginan
   - **JANGAN** centang "Initialize with README"
   - Click "Create repository"

5. **Push ke GitHub**
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/walkin-ecommerce.git
   git branch -M main
   git push -u origin main
   ```

   **Ganti** `YOUR-USERNAME` dengan username GitHub Anda!

### B. Deploy ke Vercel (Manual)

#### Option 1: Via Vercel Dashboard (Paling Mudah) ⭐

1. **Buka Vercel**
   - Go to: https://vercel.com
   - Sign up/Login (bisa pakai GitHub account)

2. **Import Project**
   - Click "Add New" → "Project"
   - Click "Import Git Repository"
   - Authorize Vercel to access your GitHub
   - Select repository: `walkin-ecommerce`

3. **Configure Project**
   - Framework Preset: **Other**
   - Root Directory: `./` (default)
   - Build Command: (kosongkan)
   - Output Directory: (kosongkan)
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait 1-2 menit
   - Done! URL akan muncul: `https://walkin-ecommerce.vercel.app`

#### Option 2: Via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow prompts:
   - Set up and deploy: **YES**
   - Which scope: Choose your account
   - Link to existing project: **NO**
   - Project name: `walkin-ecommerce`
   - Directory: `./` (press Enter)
   - Override settings: **NO**

4. **Production Deploy**
   ```bash
   vercel --prod
   ```

---

## Troubleshooting

### Git Error: "not a git repository"
```bash
git init
```

### Git Push Error: "authentication failed"
**Solution 1:** Use Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `repo`
4. Copy token
5. Use token as password when pushing

**Solution 2:** Configure credential manager
```bash
git config --global credential.helper manager
```

### Vercel Deploy Error
- Pastikan `vercel.json` ada di root folder
- Pastikan `package.json` ada
- Cek log error di Vercel dashboard

### Server Not Running di Vercel
Vercel akan otomatis menjalankan server. Tapi untuk database persistent, pertimbangkan:
- Supabase (PostgreSQL gratis)
- MongoDB Atlas (database gratis)
- Railway (hosting gratis dengan database)

---

## After Deployment

### Update Code
```bash
git add .
git commit -m "Update: your message"
git push
```

Vercel akan otomatis re-deploy!

### Custom Domain
1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS instructions

### Environment Variables
1. Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add variables seperti:
   - `DATABASE_URL`
   - `ADMIN_PASSWORD`
   - etc.

---

## 🎉 Selamat!

Website Anda sekarang:
- ✅ Di-backup di GitHub
- ✅ Live di internet via Vercel
- ✅ Auto-deploy setiap push
- ✅ HTTPS gratis
- ✅ Global CDN

**URL Anda:** `https://walkin-ecommerce.vercel.app`

Share link ini ke teman/customer Anda! 🚀
