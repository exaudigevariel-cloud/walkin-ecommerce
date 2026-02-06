# 📝 PANDUAN EDIT WEBSITE

## ✏️ File-File yang Bisa Diedit

### 1️⃣ **Edit Warna & Design** → `public/styles.css`

Buka file: `public/styles.css`

**Ubah warna di baris 4-19:**

```css
:root {
  /* Ganti warna primary (ungu) */
  --color-primary: #8B5CF6;  /* Ubah ke warna lain, contoh: #FF6B6B untuk merah */
  
  /* Ganti warna secondary (pink) */
  --color-secondary: #EC4899;  /* Contoh: #4ECDC4 untuk biru tosca */
  
  /* Ganti warna accent (biru) */
  --color-accent: #3B82F6;
  
  /* Ganti background */
  --color-dark: #0F172A;  /* Background utama */
}
```

**Contoh Edit: Ganti ke Tema Hijau-Oranye**

```css
:root {
  --color-primary: #10B981;  /* Hijau */
  --color-secondary: #F59E0B;  /* Oranye */
  --color-accent: #3B82F6;  /* Biru */
}
```

---

### 2️⃣ **Edit Teks Hero Section** → `public/index.html`

Buka file: `public/index.html`

**Edit baris 28-36:**

```html
<p class="hero-subtitle">PREMIUM FOOTWEAR</p>  <!-- Ganti subtitle -->
<h1 class="hero-title">Step Into Your Best Walk</h1>  <!-- Ganti judul -->
<p class="hero-description">
  Discover the perfect blend...  <!-- Ganti deskripsi -->
</p>
```

**Contoh Edit:**

```html
<p class="hero-subtitle">SEPATU KEREN BANGET</p>
<h1 class="hero-title">Sneakers Favorit Anak Muda</h1>
<p class="hero-description">
  Koleksi sneakers terbaru dengan harga terjangkau. 
  Kualitas import, nyaman dipakai, dan bikin gaya lo makin kece!
</p>
```

---

### 3️⃣ **Edit Nama Brand** → `public/index.html`

**Ganti "WALKIN" jadi nama brand Anda:**

Baris 17:
```html
<a href="#" class="logo" onclick="navigate('home')">WALKIN</a>
```

Ganti jadi:
```html
<a href="#" class="logo" onclick="navigate('home')">BRAND ANDA</a>
```

---

### 4️⃣ **Ubah Admin Password** → `server.js` ⚠️ PENTING!

Buka file: `server.js`

**Edit baris 148-152:**

```javascript
if (email === 'admin@walkin.com' && password === 'admin123') {
  res.json({ success: true, token: 'admin-token-' + Date.now() });
}
```

**Ganti jadi:**

```javascript
if (email === 'admin@yourdomain.com' && password === 'YourStrongPassword123!') {
  res.json({ success: true, token: 'admin-token-' + Date.now() });
}
```

---

### 5️⃣ **Edit Kategori Produk** → `public/index.html`

**Baris 48-73:**

Bisa tambah/kurangi/ubah kategori:

```html
<div class="category-card" data-category="Running">
  <div class="category-icon">🏃</div>  <!-- Ganti emoji -->
  <h3 class="category-name">Running</h3>  <!-- Ganti nama -->
</div>
```

**Contoh Tambah Kategori Baru:**

```html
<div class="category-card" data-category="Casual">
  <div class="category-icon">👟</div>
  <h3 class="category-name">Casual</h3>
</div>
```

---

### 6️⃣ **Edit Payment Link** → `public/index.html`

**Baris 152:**

```html
<a href="https://payment.walkin.com" class="payment-link">
```

Ganti ke payment gateway Anda:

```html
<a href="https://link.dana.id/qr/yourlink" class="payment-link">
<!-- Atau -->
<a href="https://gopay.co.id/pay/yourlink" class="payment-link">
```

---

### 7️⃣ **Edit Meta Tags (SEO)** → `public/index.html`

**Baris 5-6:**

```html
<title>Walkin - Premium Sneakers E-commerce</title>
<meta name="description" content="Shop premium sneakers at Walkin...">
```

Ganti jadi:

```html
<title>Nama Toko Anda - Jual Sneakers Original Import</title>
<meta name="description" content="Toko sneakers terpercaya di Indonesia. Harga murah, kualitas terjamin, 100% original!">
```

---

## 🔒 **SECURITY: Apa yang HARUS Diubah Untuk Production**

### ⚠️ 1. Admin Password (server.js)

```javascript
// JANGAN INI (Default - Tidak Aman!)
if (email === 'admin@walkin.com' && password === 'admin123') {

// GANTI JADI (Aman)
if (email === 'your-secret-email@domain.com' && password === 'VeryStr0ng!Pass123') {
```

### ⚠️ 2. Environment Variables (Untuk Deploy)

Buat file `.env` dan tambahkan:

```env
ADMIN_EMAIL=your-email@domain.com
ADMIN_PASSWORD=your-strong-password
PORT=3000
```

Lalu edit `server.js`:

```javascript
require('dotenv').config();

// Di bagian admin login:
if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
  // ...
}
```

Install dotenv:
```bash
npm install dotenv
```

---

## 🎨 **Contoh Edit: Tema Custom**

### Tema Merah-Hitam (Edgy Style)

**File: public/styles.css**

```css
:root {
  --color-primary: #EF4444;  /* Merah */
  --color-secondary: #DC2626;  /* Merah Gelap */
  --color-accent: #F59E0B;  /* Oranye */
  --color-dark: #000000;  /* Hitam */
  --color-dark-light: #1F1F1F;  /* Abu Gelap */
}
```

### Tema Biru-Gradasi (Professional)

```css
:root {
  --color-primary: #3B82F6;  /* Biru */
  --color-secondary: #2563EB;  /* Biru Lebih Gelap */
  --color-accent: #10B981;  /* Hijau */
}
```

---

## 📱 **Testing Setelah Edit**

1. **Save file** yang sudah diedit
2. **Refresh browser** (Ctrl + F5)
3. **Cek perubahan**

Jika pakai server:
```bash
# Stop server: Ctrl + C
# Start lagi: 
npm start
```

---

## 🔧 **Tips Edit yang Aman**

1. **Backup dulu** sebelum edit besar-besaran
2. **Edit satu file** at a time
3. **Test setelah setiap perubahan**
4. **Jangan edit** file di `node_modules/`
5. **Commit ke Git** setelah edit sukses:

```bash
git add .
git commit -m "Update: ubah warna dan teks"
git push
```

---

## 🚫 **TIDAK ADA API KEY BERBAHAYA**

✅ Aman! Code ini TIDAK menggunakan:
- Payment gateway API keys (hanya link)
- Third-party service keys
- Google Maps API
- Email service keys

Yang ada hanya:
- Local API (`http://localhost:3000/api`)
- Admin login credentials (hardcoded - **harus diubah!**)

---

## 📞 **Bantuan Edit**

**File Penting untuk Edit:**
- `public/styles.css` → Warna & Design
- `public/index.html` → Teks & Struktur
- `server.js` → Admin password & API
- `public/app.js` → Logic (advanced)

**Jangan Edit:**
- `package.json` (kecuali tahu apa yang dilakukan)
- `node_modules/` (auto-generated)
- `.git/` (Git internals)

---

## 🎯 Quick Edit Checklist

Sebelum deploy, edit ini:

- [ ] Admin email & password (server.js)
- [ ] Nama brand (index.html)
- [ ] Hero section text (index.html)
- [ ] Warna tema (styles.css) - opsional
- [ ] Meta tags SEO (index.html)
- [ ] Payment link (index.html)
- [ ] WhatsApp/Contact link (tambahkan di footer)

Selesai edit? Deploy dengan `DEPLOY-NOW.bat`! 🚀
