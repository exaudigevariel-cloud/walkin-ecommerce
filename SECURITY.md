# 🔒 SECURITY CHECKLIST

## ⚡ Quick Security Fixes (SEBELUM DEPLOY!)

### 1. ⚠️ UBAH ADMIN PASSWORD

**File:** `server.js` (Line 148-152)

**SEKARANG (Bahaya!):**
```javascript
if (email === 'admin@walkin.com' && password === 'admin123') {
```

**HARUS JADI:**
```javascript
if (email === 'your-secret@email.com' && password === 'YourStr0ngP@ssw0rd!') {
```

---

### 2. 🔐 Gunakan Environment Variables (Recommended)

**Step 1:** Install dotenv
```bash
npm install dotenv
```

**Step 2:** Buat file `.env`
```env
ADMIN_EMAIL=your-secure-email@domain.com
ADMIN_PASSWORD=VeryStrongPassword123!
PORT=3000
```

**Step 3:** Edit `server.js` (top of file):
```javascript
require('dotenv').config();

// Di bagian login (line 148):
if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
  res.json({ success: true, token: 'admin-token-' + Date.now() });
}
```

**Step 4:** Tambahkan `.env` ke `.gitignore`
```
.env
.env.local
```

---

### 3. 📝 Update Package.json

Tambahkan di scripts:
```json
"scripts": {
  "start": "node server.js",
  "dev": "node server.js"
}
```

---

## ✅ TIDAK ADA API KEY EKSTERNAL

Website ini **100% AMAN** karena:
- ❌ TIDAK ada API keys dari payment gateway
- ❌ TIDAK ada Google API keys
- ❌ TIDAK ada third-party secrets
- ✅ Hanya admin credentials (yang HARUS Anda ubah)

---

## 🎯 Security Best Practices

### For Local Development:
```javascript
// Di server.js
const API_URL = 'http://localhost:3000/api';
```

### For Production (Vercel):
```javascript
// Di app.js, ubah jadi:
const API_URL = window.location.origin + '/api';
// Atau
const API_URL = 'https://your-site.vercel.app/api';
```

---

## 🔐 Recommended: Hash Password

Untuk production yang lebih aman, gunakan bcrypt:

**Install:**
```bash
npm install bcrypt
```

**Di server.js:**
```javascript
const bcrypt = require('bcrypt');

// Hash password saat setup (jalankan 1x):
const hashedPassword = bcrypt.hashSync('YourPassword123!', 10);
console.log(hashedPassword); // Copy hasil ini

// Di login endpoint:
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  
  const validEmail = 'admin@yourdomain.com';
  const validPasswordHash = '$2b$10$...'; // Paste hasil hash
  
  if (email === validEmail && bcrypt.compareSync(password, validPasswordHash)) {
    res.json({ success: true, token: 'admin-token-' + Date.now() });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});
```

---

## 🚨 CHECKLIST SEBELUM DEPLOY

- [ ] ✅ Admin password sudah diubah
- [ ] ✅ Admin email sudah diubah
- [ ] ✅ `.env` sudah dibuat (jika pakai env vars)
- [ ] ✅ `.env` sudah di .gitignore
- [ ] ✅ Test login admin dengan password baru
- [ ] ✅ Tidak ada console.log() sensitive data
- [ ] ✅ API URL disesuaikan untuk production

---

## 📋 Environment Variables untuk Vercel

**Di Vercel Dashboard:**

1. Go to: Project Settings → Environment Variables
2. Tambahkan:
   - `ADMIN_EMAIL` = your-email@domain.com
   - `ADMIN_PASSWORD` = your-strong-password
   - `NODE_ENV` = production

---

## 🔍 Check for Leaks

**JANGAN commit file ini:**
- `.env`
- `node_modules/`
- `data/products.json` (contains real data)
- Any backup files (*.bak, *.tmp)

**Check .gitignore:**
```bash
cat .gitignore
```

Should include:
```
node_modules/
.env
.env.local
*.log
data/*.json
uploads/*
```

---

## ⚡ Quick Test

**Test admin login locally:**

1. Update credentials di server.js
2. Start server: `npm start`
3. Go to: `http://localhost:3000/admin.html`
4. Login dengan credentials baru
5. Pastikan bisa login ✅

**If login fails:**
- Check server.js line 148
- Check email & password spelling
- Check console for errors (F12)

---

## 🎉 You're Good to Go!

Setelah semua checklist ✅, website Anda aman untuk deploy!

**Next:** Jalankan `DEPLOY-NOW.bat` 🚀
