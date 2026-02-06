# 🚀 Quick Start Guide - Walkin E-Commerce

## Step 1: Install Dependencies

Open Terminal/Command Prompt and navigate to the project folder:

```bash
cd C:\Users\BRI\.gemini\antigravity\scratch\walkin-ecommerce
```

Then install dependencies:

```bash
npm install
```

**If you get a PowerShell security error**, run this command first:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Then try `npm install` again.

## Step 2: Start the Server

```bash
npm start
```

You should see:
```
🚀 Walkin E-commerce Server running on http://localhost:3000
📝 Admin panel: http://localhost:3000/admin.html
🛍️  Customer store: http://localhost:3000
```

## Step 3: Access the Application

Open your browser and go to:

- **Customer Store**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin.html

## Step 4: Login to Admin Panel

```
Email: admin@walkin.com
Password: admin123
```

## Step 5: Add Your Products!

1. Click "Add New Product"
2. Fill in product details
3. Upload product image
4. Click "Save Product"
5. Your products will appear on the customer store immediately!

---

## 📤 Upload to GitHub

1. **Initialize Git** (if not already):
```bash
git init
```

2. **Add all files**:
```bash
git add .
```

3. **Commit**:
```bash
git commit -m "Initial commit: Walkin e-commerce platform"
```

4. **Create GitHub repo** (on GitHub.com):
   - Go to github.com and create a new repository
   - Name it: `walkin-ecommerce`

5. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR-USERNAME/walkin-ecommerce.git
git branch -M main
git push -u origin main
```

---

## 🌐 Deploy Online (Free Options)

### Option 1: Railway.app

1. Go to railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `walkin-ecommerce` repo
5. Railway will automatically detect and deploy!

### Option 2: Render.com

1. Go to render.com
2. Create new "Web Service"
3. Connect your GitHub repo
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Click "Create Web Service"

### Option 3: Heroku

```bash
# Install Heroku CLI first, then:
heroku create walkin-store
git push heroku main
heroku open
```

---

## ❓ Troubleshooting

**Server won't start?**
- Make sure you ran `npm install` first
- Check if port 3000 is available
- Try restarting your computer

**Can't see products?**
- Make sure server is running (you should see the startup message)
- Refresh your browser
- Check browser console for errors (F12)

**Images not uploading?**
- Check file size (max 5MB)
- Use JPG, PNG, or WebP formats
- Make sure `uploads/` folder exists

---

## 📞 Need Help?

Check the full README.md for more details!

**Selamat menggunakan! 🎉**
