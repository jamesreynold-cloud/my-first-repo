// Product Database
const products = [
    // Phones
    {
        id: 1,
        name: 'iPhone 15 Pro',
        category: 'phones',
        description: 'Latest Apple smartphone with A17 Pro chip and advanced camera system.',
        price: 999.99,
        emoji: '📱',
        rating: 4.8,
        specs: 'A17 Pro • 6.1" Display • 256GB'
    },
    {
        id: 2,
        name: 'Samsung Galaxy S24',
        category: 'phones',
        description: 'Flagship Android phone with 200MP camera and 6000mAh battery.',
        price: 899.99,
        emoji: '📱',
        rating: 4.7,
        specs: 'Snapdragon 8 Gen 3 • 6.2" Display • 256GB'
    },
    {
        id: 3,
        name: 'Google Pixel 8',
        category: 'phones',
        description: 'Google\'s flagship with incredible computational photography.',
        price: 799.99,
        emoji: '📱',
        rating: 4.6,
        specs: 'Tensor G3 • 6.2" Display • 256GB'
    },
    {
        id: 4,
        name: 'OnePlus 12',
        category: 'phones',
        description: 'Fast and smooth performance with premium display.',
        price: 649.99,
        emoji: '📱',
        rating: 4.5,
        specs: 'Snapdragon 8 Gen 3 • 6.7" Display • 256GB'
    },
    
    // Laptops
    {
        id: 5,
        name: 'MacBook Pro 16"',
        category: 'laptops',
        description: 'Powerful laptop with M3 Max chip for professionals.',
        price: 2499.99,
        emoji: '💻',
        rating: 4.9,
        specs: 'M3 Max • 36GB RAM • 1TB SSD'
    },
    {
        id: 6,
        name: 'Dell XPS 15',
        category: 'laptops',
        description: 'Premium Windows laptop with RTX 4090 graphics.',
        price: 1899.99,
        emoji: '💻',
        rating: 4.7,
        specs: 'Intel i9 • RTX 4090 • 32GB RAM'
    },
    {
        id: 7,
        name: 'Lenovo ThinkPad X1 Carbon',
        category: 'laptops',
        description: 'Business laptop with exceptional keyboard and build quality.',
        price: 1299.99,
        emoji: '💻',
        rating: 4.6,
        specs: 'Intel i7 • 16GB RAM • 512GB SSD'
    },
    {
        id: 8,
        name: 'ASUS ROG Gaming Laptop',
        category: 'laptops',
        description: 'High-performance gaming laptop with RTX 4080.',
        price: 2199.99,
        emoji: '💻',
        rating: 4.8,
        specs: 'Intel i9 • RTX 4080 • 32GB RAM'
    },
    
    // Accessories
    {
        id: 9,
        name: 'AirPods Pro Max',
        category: 'accessories',
        description: 'Premium wireless headphones with spatial audio.',
        price: 549.99,
        emoji: '🎧',
        rating: 4.7,
        specs: 'Active Noise Cancellation • 20hr Battery'
    },
    {
        id: 10,
        name: 'Sony WH-1000XM5',
        category: 'accessories',
        description: 'Industry-leading noise canceling headphones.',
        price: 399.99,
        emoji: '🎧',
        rating: 4.8,
        specs: 'Industry Best ANC • 30hr Battery'
    },
    {
        id: 11,
        name: 'iPad Air 11"',
        category: 'accessories',
        description: 'Versatile tablet for work and creativity.',
        price: 799.99,
        emoji: '📲',
        rating: 4.6,
        specs: 'M2 Chip • 256GB • 11" Display'
    },
    {
        id: 12,
        name: 'Samsung Galaxy Watch 6',
        category: 'accessories',
        description: 'Premium smartwatch with health monitoring.',
        price: 349.99,
        emoji: '⌚',
        rating: 4.5,
        specs: 'AMOLED Display • 5ATM Water Resistant'
    }
];

let cart = [];
let currentProduct = null;

// Initialize the store
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    setupEventListeners();
    loadCartFromStorage();
    updateCartCount();
});

// Display products
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                ${product.emoji}
                <div class="product-badge">New</div>
            </div>
            <div class="product-body">
                <div class="product-title">${product.name}</div>
                <div class="product-category">${product.category.replace('_', ' ').toUpperCase()}</div>
                <div class="product-rating">⭐ ${product.rating}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="view-btn" onclick="openProductModal(${product.id})">View</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            if (category === 'all') {
                displayProducts(products);
            } else {
                displayProducts(products.filter(p => p.category === category));
            }
        });
    });

    // Cart button
    document.getElementById('cartBtn').addEventListener('click', openCartModal);
    
    // Modal close buttons
    document.querySelector('#productModal .close').addEventListener('click', closeProductModal);
    document.getElementById('closeCartBtn').addEventListener('click', closeCartModal);
    document.getElementById('closeCheckoutBtn').addEventListener('click', closeCheckoutModal);
    
    // Cart modal close
    document.getElementById('cartModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('cartModal')) {
            closeCartModal();
        }
    });
    
    // Product modal close
    document.getElementById('productModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('productModal')) {
            closeProductModal();
        }
    });
    
    // Checkout modal close
    document.getElementById('checkoutModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('checkoutModal')) {
            closeCheckoutModal();
        }
    });

    // Add to cart button
    document.getElementById('addToCartBtn').addEventListener('click', addToCart);
    
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', openCheckoutModal);
    
    // Checkout form submission
    document.getElementById('checkoutForm').addEventListener('submit', completeCheckout);
}

// Open product modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        currentProduct = product;
        document.getElementById('modalImage').textContent = product.emoji;
        document.getElementById('modalTitle').textContent = product.name;
        document.getElementById('modalDescription').textContent = product.description;
        document.getElementById('modalPrice').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('modalRating').textContent = product.rating;
        document.getElementById('modalSpecs').innerHTML = `<p><strong>Specs:</strong> ${product.specs}</p>`;
        document.getElementById('quantityInput').value = 1;
        document.getElementById('productModal').classList.add('active');
    }
}

// Close product modal
function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    currentProduct = null;
}

// Add to cart
function addToCart() {
    if (currentProduct) {
        const quantity = parseInt(document.getElementById('quantityInput').value);
        
        const cartItem = {
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            quantity: quantity,
            emoji: currentProduct.emoji
        };
        
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.id === cartItem.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push(cartItem);
        }
        
        saveCartToStorage();
        updateCartCount();
        closeProductModal();
        showAddedNotification();
    }
}

// Show added notification
function showAddedNotification() {
    const cartBtn = document.getElementById('cartBtn');
    const originalColor = cartBtn.style.background;
    cartBtn.style.background = '#2ecc71';
    setTimeout(() => {
        cartBtn.style.background = originalColor || '';
    }, 1000);
}

// Open cart modal
function openCartModal() {
    displayCartItems();
    document.getElementById('cartModal').classList.add('active');
}

// Close cart modal
function closeCartModal() {
    document.getElementById('cartModal').classList.remove('active');
}

// Display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-message"><p>Your cart is empty. Start shopping!</p></div>';
        document.getElementById('checkoutBtn').disabled = true;
        document.getElementById('checkoutBtn').style.opacity = '0.5';
        return;
    }
    
    document.getElementById('checkoutBtn').disabled = false;
    document.getElementById('checkoutBtn').style.opacity = '1';
    
    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.emoji} ${item.name}</div>
                <div class="cart-item-detail">Qty: ${item.quantity}</div>
            </div>
            <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });
    
    updateCartSummary();
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToStorage();
    updateCartCount();
    displayCartItems();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Open checkout modal
function openCheckoutModal() {
    if (cart.length > 0) {
        closeCartModal();
        document.getElementById('checkoutModal').classList.add('active');
    }
}

// Close checkout modal
function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
}

// Complete checkout
function completeCheckout(e) {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(document.getElementById('checkoutForm'));
    
    // Show success message
    const modal = document.getElementById('checkoutModal');
    const form = document.getElementById('checkoutForm');
    
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <p>✓ Order Placed Successfully!</p>
        <p>Thank you for shopping at Electronics Marketplace.</p>
        <p style="font-size: 0.9em; margin-top: 10px;">Your order will be shipped within 2-3 business days.</p>
    `;
    
    form.parentNode.insertBefore(successMsg, form);
    form.style.display = 'none';
    
    // Clear cart after 2 seconds
    setTimeout(() => {
        cart = [];
        saveCartToStorage();
        updateCartCount();
        closeCheckoutModal();
        document.getElementById('checkoutForm').style.display = '';
        successMsg.remove();
    }, 2000);
}

// Local Storage functions
function saveCartToStorage() {
    localStorage.setItem('electronicsMarketplaceCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('electronicsMarketplaceCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}
