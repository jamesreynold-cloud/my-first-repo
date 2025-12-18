// Product Database
const products = [
    // Men's Products
    {
        id: 1,
        name: 'Classic Black T-Shirt',
        category: 'mens',
        description: 'Premium quality cotton t-shirt perfect for everyday wear.',
        price: 29.99,
        emoji: '👕'
    },
    {
        id: 2,
        name: 'Blue Denim Jeans',
        category: 'mens',
        description: 'Comfortable and stylish blue denim jeans for all occasions.',
        price: 59.99,
        emoji: '👖'
    },
    {
        id: 3,
        name: 'Men\'s Leather Jacket',
        category: 'mens',
        description: 'Sleek black leather jacket - a timeless classic.',
        price: 149.99,
        emoji: '🧥'
    },
    {
        id: 4,
        name: 'Casual White Sneakers',
        category: 'mens',
        description: 'Comfortable white sneakers for casual outings.',
        price: 79.99,
        emoji: '👟'
    },
    
    // Women's Products
    {
        id: 5,
        name: 'Elegant Black Dress',
        category: 'womens',
        description: 'Sophisticated black evening dress for special occasions.',
        price: 89.99,
        emoji: '👗'
    },
    {
        id: 6,
        name: 'Floral Summer Blouse',
        category: 'womens',
        description: 'Beautiful floral print blouse perfect for summer.',
        price: 44.99,
        emoji: '🌸'
    },
    {
        id: 7,
        name: 'Women\'s Blazer',
        category: 'womens',
        description: 'Professional blazer for work and formal events.',
        price: 119.99,
        emoji: '🧥'
    },
    {
        id: 8,
        name: 'Athletic Yoga Pants',
        category: 'womens',
        description: 'Comfortable and stretchy yoga pants for fitness.',
        price: 64.99,
        emoji: '🩳'
    },
    
    // Accessories
    {
        id: 9,
        name: 'Designer Sunglasses',
        category: 'accessories',
        description: 'Stylish sunglasses with UV protection.',
        price: 99.99,
        emoji: '😎'
    },
    {
        id: 10,
        name: 'Premium Leather Belt',
        category: 'accessories',
        description: 'High-quality leather belt for any outfit.',
        price: 49.99,
        emoji: '⌚'
    },
    {
        id: 11,
        name: 'Wool Winter Scarf',
        category: 'accessories',
        description: 'Warm and cozy wool scarf for cold weather.',
        price: 39.99,
        emoji: '🧣'
    },
    {
        id: 12,
        name: 'Crossbody Bag',
        category: 'accessories',
        description: 'Stylish crossbody bag for everyday use.',
        price: 69.99,
        emoji: '👜'
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
            <div class="product-image">${product.emoji}</div>
            <div class="product-body">
                <div class="product-title">${product.name}</div>
                <div class="product-category">${product.category.replace('_', ' ').toUpperCase()}</div>
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
        document.getElementById('quantityInput').value = 1;
        document.getElementById('sizeSelect').value = 'M';
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
        const size = document.getElementById('sizeSelect').value;
        const quantity = parseInt(document.getElementById('quantityInput').value);
        
        const cartItem = {
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            size: size,
            quantity: quantity,
            emoji: currentProduct.emoji
        };
        
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.id === cartItem.id && item.size === cartItem.size);
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
                <div class="cart-item-detail">Size: ${item.size} | Qty: ${item.quantity}</div>
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
    const tax = subtotal * 0.1;
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
        <p>Thank you for shopping at Pursuit Fashion Store.</p>
        <p style="font-size: 0.9em; margin-top: 10px;">Your order will be shipped soon.</p>
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
    localStorage.setItem('pursuitFashionCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('pursuitFashionCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}
