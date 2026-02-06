// API Base URL
const API_URL = 'http://localhost:3000/api';

// State
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentView = 'home';
let selectedProduct = null;
let currentCategory = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();
    initializeCheckoutForm();
});

// API Functions
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();

        if (data.success) {
            products = data.products;
            renderProducts();
        }
    } catch (error) {
        console.error('Error loading products:', error);
        // Load sample products as fallback
        loadSampleProducts();
    }
}

// Fallback sample products when server is not running
function loadSampleProducts() {
    products = [
        {
            id: 1,
            name: "Air Flow Runner",
            price: 1299000,
            category: "Running",
            description: "Lightweight running shoes with advanced cushioning technology for maximum comfort during long runs.",
            image: null,
            sizes: ["40", "41", "42", "43", "44"],
            stock: 50
        },
        {
            id: 2,
            name: "Street Style High",
            price: 1499000,
            category: "Lifestyle",
            description: "Premium high-top sneakers combining street style with everyday comfort.",
            image: null,
            sizes: ["39", "40", "41", "42", "43"],
            stock: 35
        },
        {
            id: 3,
            name: "Sport Pro Elite",
            price: 1799000,
            category: "Sports",
            description: "Professional-grade sports shoes designed for peak performance.",
            image: null,
            sizes: ["40", "41", "42", "43", "44", "45"],
            stock: 25
        }
    ];
    renderProducts();
    showServerWarning();
}

function showServerWarning() {
    const grid = document.getElementById('productsGrid');
    const warning = document.createElement('div');
    warning.style.cssText = 'grid-column: 1/-1; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1.5rem; text-align: center;';
    warning.innerHTML = `
        <p style="color: #FCD34D; margin-bottom: 0.5rem; font-weight: 600;">⚠️ Server Not Running</p>
        <p style="color: #FDE68A; font-size: 0.9rem;">Sample products are being displayed. Start the server to upload your own products!</p>
        <p style="color: #FDE68A; font-size: 0.85rem; margin-top: 0.5rem;">Run: <code style="background: rgba(0,0,0,0.3); padding: 0.2rem 0.5rem; border-radius: 0.25rem;">npm start</code></p>
    `;
    grid.parentElement.insertBefore(warning, grid);
}

// Navigation
function navigate(view) {
    // Hide all views
    document.getElementById('homeView').classList.add('hide');
    document.getElementById('productDetailView').classList.add('hide');
    document.getElementById('cartView').classList.add('hide');
    document.getElementById('checkoutView').classList.add('hide');

    // Show selected view
    currentView = view;

    switch (view) {
        case 'home':
            document.getElementById('homeView').classList.remove('hide');
            break;
        case 'product':
            document.getElementById('productDetailView').classList.remove('hide');
            renderProductDetail();
            break;
        case 'cart':
            document.getElementById('cartView').classList.remove('hide');
            renderCart();
            break;
        case 'checkout':
            document.getElementById('checkoutView').classList.remove('hide');
            renderCheckoutSummary();
            break;
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToProducts() {
    const productsSection = document.getElementById('products');
    productsSection.scrollIntoView({ behavior: 'smooth' });
}

// Filter by Category
function filterByCategory(category) {
    currentCategory = category;

    // Update active category card
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    event.target.closest('.category-card').classList.add('active');

    // Render filtered products
    renderProducts();
}

// Render Products
function renderProducts() {
    const grid = document.getElementById('productsGrid');

    const filteredProducts = currentCategory === 'all'
        ? products
        : products.filter(p => p.category === currentCategory);

    if (filteredProducts.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-gray); padding: 3rem;">No products found in this category.</p>';
        return;
    }

    grid.innerHTML = filteredProducts.map(product => `
    <div class="product-card" onclick="viewProduct(${product.id})">
      <div class="product-image">
        ${product.image ? `<img src="${product.image}" alt="${product.name}">` : '👟'}
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">Rp ${formatPrice(product.price)}</div>
      </div>
    </div>
  `).join('');
}


// View Product Detail
function viewProduct(productId) {
    selectedProduct = products.find(p => p.id === productId);
    if (selectedProduct) {
        navigate('product');
    }
}

// Render Product Detail
function renderProductDetail() {
    if (!selectedProduct) return;

    const content = document.getElementById('productDetailContent');
    content.innerHTML = `
    <div class="product-detail-image">
      ${selectedProduct.image ? `<img src="${selectedProduct.image}" alt="${selectedProduct.name}">` : '<div style="font-size: 5rem;">👟</div>'}
    </div>
    <div class="product-detail-info">
      <div class="product-detail-category">${selectedProduct.category}</div>
      <h1>${selectedProduct.name}</h1>
      <div class="product-detail-price">Rp ${formatPrice(selectedProduct.price)}</div>
      <p class="product-detail-description">${selectedProduct.description}</p>
      
      <div class="size-selector">
        <h3>Select Size</h3>
        <div class="size-options" id="sizeOptions">
          ${selectedProduct.sizes ? selectedProduct.sizes.map(size => `
            <button class="size-option" onclick="selectSize('${size}')" data-size="${size}">${size}</button>
          `).join('') : '<p style="color: var(--color-text-gray);">One size fits all</p>'}
        </div>
      </div>
      
      <button class="add-to-cart-btn" onclick="addToCart(${selectedProduct.id})">
        Add to Cart 🛒
      </button>
    </div>
  `;
}

let selectedSize = null;

function selectSize(size) {
    selectedSize = size;
    document.querySelectorAll('.size-option').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Check if size is required and selected
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
        alert('Please select a size');
        return;
    }

    const existingItem = cart.find(item =>
        item.id === productId && item.size === selectedSize
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            size: selectedSize,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    // Show feedback
    alert(`${product.name} added to cart!`);
    selectedSize = null;
}

function updateQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        saveCart();
        renderCart();
        updateCartCount();
    }
}

function removeFromCart(index) {
    if (confirm('Remove this item from cart?')) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
        updateCartCount();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Render Cart
function renderCart() {
    const content = document.getElementById('cartContent');

    if (cart.length === 0) {
        content.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some awesome sneakers to get started!</p>
        <button class="btn btn-primary" onclick="navigate('home')" style="margin-top: 2rem;">
          Shop Now
        </button>
      </div>
    `;
        return;
    }

    content.innerHTML = `
    <div class="cart-grid">
      <div class="cart-items">
        ${cart.map((item, index) => `
          <div class="cart-item">
            <div class="cart-item-image">
              ${item.image ? `<img src="${item.image}" alt="${item.name}">` : '<div style="font-size: 2rem; display: flex; align-items: center; justify-content: center; height: 100%;">👟</div>'}
            </div>
            <div class="cart-item-info">
              <h3 class="cart-item-name">${item.name}</h3>
              <p class="cart-item-price">Rp ${formatPrice(item.price)}</p>
              ${item.size ? `<p style="color: var(--color-text-gray); font-size: 0.9rem;">Size: ${item.size}</p>` : ''}
            </div>
            <div class="cart-item-controls">
              <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
              </div>
              <button class="remove-btn" onclick="removeFromCart(${index})">🗑️</button>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="cart-summary">
        <h2>Order Summary</h2>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>Rp ${formatPrice(getCartTotal())}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div class="summary-row summary-total">
          <span>Total</span>
          <span class="amount">Rp ${formatPrice(getCartTotal())}</span>
        </div>
        <button class="checkout-btn" onclick="navigate('checkout')">
          Proceed to Checkout
        </button>
      </div>
    </div>
  `;
}

// Render Checkout Summary
function renderCheckoutSummary() {
    const summary = document.getElementById('checkoutSummary');
    summary.innerHTML = `
    <h2>Order Summary</h2>
    ${cart.map(item => `
      <div class="summary-row">
        <span>${item.name} x${item.quantity}</span>
        <span>Rp ${formatPrice(item.price * item.quantity)}</span>
      </div>
    `).join('')}
    <div class="summary-row">
      <span>Shipping</span>
      <span>Free</span>
    </div>
    <div class="summary-row summary-total">
      <span>Total</span>
      <span class="amount">Rp ${formatPrice(getCartTotal())}</span>
    </div>
  `;
}

// Checkout Form
function initializeCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', handleCheckout);
}

async function handleCheckout(e) {
    e.preventDefault();

    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        province: document.getElementById('province').value,
        postalCode: document.getElementById('postalCode').value,
        country: document.getElementById('country').value
    };

    const orderData = {
        customerInfo: formData,
        items: cart,
        total: getCartTotal()
    };

    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (data.success) {
            alert(`Order placed successfully! Order ID: ${data.order.id}\n\nThank you for shopping at Walkin!`);
            cart = [];
            saveCart();
            updateCartCount();
            navigate('home');
            document.getElementById('checkoutForm').reset();
        } else {
            alert('Failed to place order. Please try again.');
        }
    } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please ensure the server is running.');
    }
}

// Helper Functions
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID').format(price);
}
