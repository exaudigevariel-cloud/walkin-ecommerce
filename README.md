# 👟 WALKIN - Full-Stack E-Commerce Platform

A complete, production-ready e-commerce platform for selling sneakers with admin panel, product management, shopping cart, and checkout functionality.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## ✨ Features

### 🛍️ Customer Storefront
- **Premium Design**: Modern, vibrant UI with gradient colors and smooth animations
- **Product Catalog**: Browse products by category with dynamic filtering
- **Product Details**: Full product pages with size selection
- **Shopping Cart**: Add, update, remove items with quantity controls
- **Checkout**: Complete checkout flow with customer information forms
- **Responsive**: Mobile-first design, works on all devices

### 🔐 Admin Panel
- **Secure Login**: Admin authentication system
- **Product Management**: Add, edit, and delete products
- **Image Upload**: Upload product images directly from browser
- **Real-time Updates**: Changes reflect immediately on storefront
- **Dashboard**: Clean interface for managing inventory

### 🚀 Technical Features
- **REST API**: Express.js backend with full CRUD operations
- **File Upload**: Multer integration for image handling
- **Data Persistence**: JSON-based database (easily upgradable to SQL)
- **CORS Enabled**: Cross-origin resource sharing configured
- **Error Handling**: Comprehensive error handling throughout

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- A modern web browser

## 🔧 Installation

1. **Clone or download this repository**

```bash
git clone https://github.com/yourusername/walkin-ecommerce.git
cd walkin-ecommerce
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the server**

```bash
npm start
```

The server will start on `http://localhost:3000`

## 🎯 Usage

### Accessing the Application

- **Customer Store**: `http://localhost:3000`
- **Admin Panel**: `http://localhost:3000/admin.html`

### Admin Credentials

```
Email: admin@walkin.com
Password: admin123
```

⚠️ **Important**: Change these default credentials in production!

### Managing Products

1. Log in to the admin panel
2. Click "Add New Product" button
3. Fill in product details:
   - Name
   - Price (in Rupiah)
   - Category
   - Description
   - Available sizes (comma-separated)
   - Upload product image
4. Click "Save Product"

### Customer Shopping Flow

1. Browse products on homepage
2. Filter by category
3. Click product to view details
4. Select size and add to cart
5. View cart and update quantities
6. Proceed to checkout
7. Fill in shipping information
8. Place order

## 📁 Project Structure

```
walkin-ecommerce/
├── server.js                 # Express backend server
├── package.json              # Node.js dependencies
├── data/
│   └── products.json         # Product database
├── uploads/                  # Uploaded product images
├── public/
│   ├── index.html           # Customer storefront
│   ├── admin.html           # Admin panel
│   ├── styles.css           # Main stylesheet
│   ├── admin-styles.css     # Admin panel styles
│   ├── app.js               # Customer app logic
│   └── admin.js             # Admin panel logic
└── README.md                # This file
```

## 🔌 API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product (with image upload)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Admin

- `POST /api/admin/login` - Admin authentication

### Orders

- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (admin only)

## 🎨 Customization

### Colors

Edit CSS variables in `public/styles.css`:

```css
:root {
  --color-primary: #8B5CF6;
  --color-secondary: #EC4899;
  --color-accent: #3B82F6;
  /* ... more colors */
}
```

### Admin Credentials

Edit in `server.js`:

```javascript
if (email === 'your@email.com' && password === 'your-password') {
  // Authentication logic
}
```

### Database

Currently uses JSON file storage. To upgrade to SQL:

1. Install database driver (e.g., `pg`, `mysql2`, `sqlite3`)
2. Replace file operations in `server.js` with database queries
3. Update schema in migration files

## 🚀 Deployment

### Deploying to Heroku

1. Create `Procfile`:
```
web: node server.js
```

2. Deploy:
```bash
heroku create your-app-name
git push heroku main
```

### Deploying to Vercel/Railway

1. Push code to GitHub
2. Connect repository to platform
3. Set build command: `npm install`
4. Set start command: `node server.js`

### Environment Variables

For production, set:
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Set to 'production'

## 📝 To-Do / Future Enhancements

- [ ] User authentication & accounts
- [ ] Order history for customers
- [ ] Payment gateway integration (Stripe, Midtrans)
- [ ] Email notifications
- [ ] Product reviews & ratings
- [ ] Search functionality
- [ ] Wishlist feature
- [ ] Multi-language support
- [ ] Analytics dashboard
- [ ] Inventory alerts
- [ ] Discount codes & promotions

## 🐛 Troubleshooting

### Server won't start
- Check if port 3000 is available
- Ensure Node.js is installed: `node --version`
- Delete `node_modules` and run `npm install` again

### Products not loading
- Ensure server is running
- Check browser console for errors
- Verify API URL in `app.js` matches your server

### Images not displaying
- Check `uploads/` folder exists
- Verify file permissions
- Ensure image file size < 5MB

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created with ❤️ for Walkin Sneakers

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For support, email support@walkin.com or open an issue on GitHub.

---

**Made with 💜 using Node.js, Express, and Vanilla JavaScript**
