const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Ensure directories exist
const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Database file
const DB_FILE = path.join(dataDir, 'products.json');

// Initialize database if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
  const initialData = {
    products: [
      {
        id: 1,
        name: "Air Flow Runner",
        price: 1299000,
        category: "Running",
        description: "Lightweight running shoes with advanced cushioning technology for maximum comfort during long runs.",
        image: "/uploads/sample1.jpg",
        sizes: ["40", "41", "42", "43", "44"],
        stock: 50
      },
      {
        id: 2,
        name: "Street Style High",
        price: 1499000,
        category: "Lifestyle",
        description: "Premium high-top sneakers combining street style with everyday comfort.",
        image: "/uploads/sample2.jpg",
        sizes: ["39", "40", "41", "42", "43"],
        stock: 35
      },
      {
        id: 3,
        name: "Sport Pro Elite",
        price: 1799000,
        category: "Sports",
        description: "Professional-grade sports shoes designed for peak performance.",
        image: "/uploads/sample3.jpg",
        sizes: ["40", "41", "42", "43", "44", "45"],
        stock: 25
      }
    ],
    orders: [],
    nextProductId: 4,
    nextOrderId: 1
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

// Helper functions
const readDB = () => {
  const data = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
});

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
  try {
    const db = readDB();
    res.json({ success: true, products: db.products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  try {
    const db = readDB();
    const product = db.products.find(p => p.id === parseInt(req.params.id));
    if (product) {
      res.json({ success: true, product });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new product (with image upload)
app.post('/api/products', upload.single('image'), (req, res) => {
  try {
    const db = readDB();
    const { name, price, category, description, sizes, stock } = req.body;
    
    const newProduct = {
      id: db.nextProductId++,
      name,
      price: parseFloat(price),
      category,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : '/uploads/placeholder.jpg',
      sizes: typeof sizes === 'string' ? sizes.split(',').map(s => s.trim()) : sizes,
      stock: parseInt(stock) || 0
    };
    
    db.products.push(newProduct);
    writeDB(db);
    
    res.json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update product
app.put('/api/products/:id', upload.single('image'), (req, res) => {
  try {
    const db = readDB();
    const productIndex = db.products.findIndex(p => p.id === parseInt(req.params.id));
    
    if (productIndex === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    const { name, price, category, description, sizes, stock } = req.body;
    const existingProduct = db.products[productIndex];
    
    db.products[productIndex] = {
      ...existingProduct,
      name: name || existingProduct.name,
      price: price ? parseFloat(price) : existingProduct.price,
      category: category || existingProduct.category,
      description: description || existingProduct.description,
      image: req.file ? `/uploads/${req.file.filename}` : existingProduct.image,
      sizes: sizes ? (typeof sizes === 'string' ? sizes.split(',').map(s => s.trim()) : sizes) : existingProduct.sizes,
      stock: stock ? parseInt(stock) : existingProduct.stock
    };
    
    writeDB(db);
    res.json({ success: true, product: db.products[productIndex] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
  try {
    const db = readDB();
    const productIndex = db.products.findIndex(p => p.id === parseInt(req.params.id));
    
    if (productIndex === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    // Delete associated image file
    const product = db.products[productIndex];
    if (product.image && product.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    db.products.splice(productIndex, 1);
    writeDB(db);
    
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin login (simple authentication)
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple hardcoded admin credentials (in production, use proper authentication)
  if (email === 'admin@walkin.com' && password === 'admin123') {
    res.json({ success: true, token: 'admin-token-' + Date.now() });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Create order
app.post('/api/orders', (req, res) => {
  try {
    const db = readDB();
    const { customerInfo, items, total } = req.body;
    
    const newOrder = {
      id: db.nextOrderId++,
      customerInfo,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    db.orders.push(newOrder);
    writeDB(db);
    
    res.json({ success: true, order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all orders (admin only)
app.get('/api/orders', (req, res) => {
  try {
    const db = readDB();
    res.json({ success: true, orders: db.orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Walkin E-commerce Server running on http://localhost:${PORT}`);
  console.log(`📝 Admin panel: http://localhost:${PORT}/admin.html`);
  console.log(`🛍️  Customer store: http://localhost:${PORT}`);
});
