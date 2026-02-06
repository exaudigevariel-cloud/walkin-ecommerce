// API Base URL
const API_URL = 'http://localhost:3000/api';

// State
let products = [];
let isLoggedIn = false;
let editingProductId = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initializeForms();
});

// Check if already logged in
function checkAuth() {
    const token = localStorage.getItem('adminToken');
    if (token) {
        isLoggedIn = true;
        showDashboard();
        loadProducts();
    } else {
        showLogin();
    }
}

// Show/Hide Views
function showLogin() {
    document.getElementById('loginView').classList.remove('hide');
    document.getElementById('dashboardView').classList.add('hide');
}

function showDashboard() {
    document.getElementById('loginView').classList.add('hide');
    document.getElementById('dashboardView').classList.remove('hide');
}

// Initialize Forms
function initializeForms() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('productFormElement').addEventListener('submit', handleProductSubmit);
}

// Login
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_URL}/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('adminToken', data.token);
            isLoggedIn = true;
            showDashboard();
            loadProducts();
        } else {
            alert('Invalid credentials');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please ensure the server is running.');
    }
}

// Logout
function logout() {
    localStorage.removeItem('adminToken');
    isLoggedIn = false;
    products = [];
    showLogin();
}

// Load Products
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();

        if (data.success) {
            products = data.products;
            renderProductsTable();
        }
    } catch (error) {
        console.error('Error loading products:', error);
        alert('Failed to load products');
    }
}

// Render Products Table
function renderProductsTable() {
    const tbody = document.getElementById('productsTableBody');

    if (products.length === 0) {
        tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 3rem; color: #94A3B8;">
          No products yet. Add your first product to get started!
        </td>
      </tr>
    `;
        return;
    }

    tbody.innerHTML = products.map(product => `
    <tr>
      <td>
        <div class="product-image-cell">
          ${product.image ? `<img src="${product.image}" alt="${product.name}">` : '👟'}
        </div>
      </td>
      <td><strong>${product.name}</strong></td>
      <td><span class="product-category-badge">${product.category}</span></td>
      <td class="product-price">Rp ${formatPrice(product.price)}</td>
      <td class="product-stock ${product.stock < 10 ? 'low' : ''}">${product.stock}</td>
      <td>
        <div class="product-actions">
          <button class="btn btn-secondary btn-small" onclick="editProduct(${product.id})">Edit</button>
          <button class="btn btn-danger btn-small" onclick="deleteProduct(${product.id})">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Show Add Product Form
function showAddProductForm() {
    editingProductId = null;
    document.getElementById('formTitle').textContent = 'Add New Product';
    document.getElementById('productFormElement').reset();
    document.getElementById('productId').value = '';
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('productForm').classList.remove('hide');

    // Scroll to form
    document.getElementById('productForm').scrollIntoView({ behavior: 'smooth' });
}

// Hide Product Form
function hideProductForm() {
    document.getElementById('productForm').classList.add('hide');
    document.getElementById('productFormElement').reset();
    editingProductId = null;
}

// Edit Product
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    editingProductId = productId;
    document.getElementById('formTitle').textContent = 'Edit Product';
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productSizes').value = product.sizes ? product.sizes.join(', ') : '';

    // Show existing image
    if (product.image) {
        document.getElementById('imagePreview').innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #94A3B8;">Current image (upload new to replace)</p>
    `;
    }

    document.getElementById('productForm').classList.remove('hide');
    document.getElementById('productForm').scrollIntoView({ behavior: 'smooth' });
}

// Preview Image
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('imagePreview').innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
}

// Handle Product Submit (Add or Edit)
async function handleProductSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('productName').value);
    formData.append('price', document.getElementById('productPrice').value);
    formData.append('category', document.getElementById('productCategory').value);
    formData.append('stock', document.getElementById('productStock').value);
    formData.append('description', document.getElementById('productDescription').value);

    const sizesInput = document.getElementById('productSizes').value;
    if (sizesInput) {
        formData.append('sizes', sizesInput);
    }

    const imageFile = document.getElementById('productImage').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        let response;

        if (editingProductId) {
            // Update existing product
            response = await fetch(`${API_URL}/products/${editingProductId}`, {
                method: 'PUT',
                body: formData
            });
        } else {
            // Create new product
            response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                body: formData
            });
        }

        const data = await response.json();

        if (data.success) {
            alert(editingProductId ? 'Product updated successfully!' : 'Product added successfully!');
            hideProductForm();
            loadProducts();
        } else {
            alert('Failed to save product: ' + data.message);
        }
    } catch (error) {
        console.error('Error saving product:', error);
        alert('Failed to save product. Please ensure the server is running.');
    }
}

// Delete Product
async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            alert('Product deleted successfully!');
            loadProducts();
        } else {
            alert('Failed to delete product');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
    }
}

// Helper Functions
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID').format(price);
}
