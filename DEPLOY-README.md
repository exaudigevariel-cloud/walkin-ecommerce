# 🚀 DEPLOY OTOMATIS - PANDUAN CEPAT

## ⚡ Super Quick Deploy (1-Click)

**Cara Tercepat:**

```
Double-click file: DEPLOY-NOW.bat
```

Script ini akan otomatis:
1. ✅ Configure Git
2. ✅ Commit semua file
3. ✅ Push ke GitHub (Anda tinggal paste URL)
4. ✅ Optional: Deploy ke Vercel

---

## 📋 Yang Anda Butuhkan

- [x] Akun GitHub (gratis): https://github.com/join
- [x] Akun Vercel (gratis): https://vercel.com/signup
- [x] Git terinstall di komputer

---

## 🎯 Langkah-Langkah

### Step 1: Buat Repository GitHub

1. Buka: https://github.com/new
2. **Repository name:** `walkin-ecommerce`
3. **Description:** `Full-stack e-commerce platform`
4. Public/Private: *Pilih sesuai keinginan*
5. **JANGAN** centang "Initialize with README"
6. Click **"Create repository"**
7. **Copy URL** repository (contoh: `https://github.com/username/walkin-ecommerce.git`)

### Step 2: Run Script

**Double-click:** `DEPLOY-NOW.bat`

Script akan:
- Tanya nama & email (untuk Git config)
- Commit semua code
- Minta URL GitHub → **Paste URL yang tadi di-copy**
- Push ke GitHub ✅

### Step 3: Deploy ke Vercel

**Pilih salah satu:**

#### A. Via Vercel Dashboard (PALING MUDAH) ⭐

1. Go to: https://vercel.com/new
2. Login dengan GitHub account
3. Click **"Import Git Repository"**
4. Pilih repository: `walkin-ecommerce`
5. Click **"Deploy"**
6. ✅ DONE! Website live dalam 2 menit!

#### B. Via Script

```
Double-click: deploy-vercel.bat
```

Pilih Option 1 (CLI) atau Option 2 (Manual)

---

## 🌐 Setelah Deploy

Website Anda akan live di:
```
https://walkin-ecommerce.vercel.app
```

Atau custom domain sesuai project name Anda.

---

## 🔄 Update Website

Setiap kali ada perubahan code:

```bash
git add .
git commit -m "Update: deskripsi perubahan"
git push
```

Vercel akan **otomatis re-deploy**! 🎉

---

## ❓ Troubleshooting

### "Git is not installed"
- Download & install: https://git-scm.com/download/win

### "Authentication failed" saat push
**Solusi:**
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scope: `repo`
4. Copy token
5. Gunakan token sebagai password saat push

### Database tidak persist di Vercel
Vercel serverless tidak cocok untuk JSON database.

**Upgrade ke:**
- **Railway.app** (gratis, persistent storage) ← Recommended
- MongoDB Atlas (database cloud gratis)
- Supabase (PostgreSQL gratis)

---

## 📚 Files untuk Deploy

- ✅ `DEPLOY-NOW.bat` - All-in-one automatic deploy
- ✅ `setup-git.bat` - Git configuration only
- ✅ `deploy-github.bat` - GitHub push only
- ✅ `deploy-vercel.bat` - Vercel deploy only
- ✅ `vercel.json` - Vercel configuration
- ✅ `DEPLOYMENT.md` - Detailed manual guide

---

## 🎉 Selamat!

Dalam beberapa menit, website e-commerce Anda akan:
- ✅ Online 24/7
- ✅ HTTPS gratis
- ✅ Global CDN
- ✅ Auto-deploy on push

**Share link website Anda ke teman dan mulai jualan!** 🛍️

---

**Need help?** Check `DEPLOYMENT.md` for detailed guide.
