// Products data
const products = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, image: '🎧', category: 'Electronics' },
    { id: 2, name: 'Smart Watch', price: 199.99, image: '⌚', category: 'Electronics' },
    { id: 3, name: 'Laptop Backpack', price: 49.99, image: '🎒', category: 'Accessories' },
    { id: 4, name: 'USB-C Cable', price: 12.99, image: '🔌', category: 'Accessories' },
    { id: 5, name: 'Bluetooth Speaker', price: 59.99, image: '🔊', category: 'Electronics' },
    { id: 6, name: 'Phone Case', price: 24.99, image: '📱', category: 'Accessories' },
];

// Cart functions
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const cart = getCart();
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = cart.length;
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    alert(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    const cart = getCart();
    const newCart = cart.filter(item => item.id !== productId);
    saveCart(newCart);
    loadCart();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity === 0) {
        removeFromCart(productId);
        return;
    }

    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart(cart);
        loadCart();
    }
}

function getTotalPrice() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
}

// Load products on products page
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="btn btn-primary btn-block" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Load cart on cart page
function loadCart() {
    const cart = getCart();
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');
    const cartItems = document.getElementById('cartItems');

    if (!cartItems) return;

    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartContent) cartContent.style.display = 'none';
        return;
    }

    if (emptyCart) emptyCart.style.display = 'none';
    if (cartContent) cartContent.style.display = 'grid';

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-info">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    const total = getTotalPrice();
    document.getElementById('subtotal').textContent = `$${total}`;
    document.getElementById('total').textContent = `$${total}`;
}

// Checkout
function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    localStorage.removeItem('cart');
    window.location.href = "https://shradzhiremath-ui.github.io/payment/";
}

// Contact form
function sendMessage() {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    window.location.href = 'thankyou.html';
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    loadProducts();
    loadCart();

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
        window.location.href = "https://example.com/checkout"; // your URL here
    });
}

    // Send message button
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', sendMessage);
    }
});
