const products = [
    { id: 1, name: 'Ceramic Vase', category: 'pottery', description: 'Beautiful hand-thrown ceramic vase', price: 89.99, emoji: '🏺', artisan: 'Maria Garcia' },
    { id: 2, name: 'Silver Ring', category: 'jewelry', description: 'Handcrafted silver ring with stones', price: 129.99, emoji: '💍', artisan: 'James Smith' },
    { id: 3, name: 'Wooden Wall Art', category: 'decor', description: 'Intricate wooden wall sculpture', price: 149.99, emoji: '🎨', artisan: 'Elena Rossi' },
    { id: 4, name: 'Beaded Necklace', category: 'jewelry', description: 'Colorful beaded necklace', price: 59.99, emoji: '📿', artisan: 'Amara Okonkwo' },
    { id: 5, name: 'Pottery Bowl', category: 'pottery', description: 'Hand-painted ceramic bowl', price: 79.99, emoji: '🍯', artisan: 'Diego Lopez' },
    { id: 6, name: 'Macrame Wall Hanging', category: 'decor', description: 'Beautiful macrame wall decor', price: 99.99, emoji: '🧵', artisan: 'Sofia Chen' },
    { id: 7, name: 'Leather Bracelet', category: 'jewelry', description: 'Premium leather with metal accents', price: 49.99, emoji: '⌚', artisan: 'John Taylor' },
    { id: 8, name: 'Decorative Mirror', category: 'decor', description: 'Ornate handcrafted mirror', price: 189.99, emoji: '🪞', artisan: 'Isabella Moretti' },
    { id: 9, name: 'Tapestry Cloth', category: 'decor', description: 'Hand-woven tapestry', price: 119.99, emoji: '🧶', artisan: 'Kenji Yamamoto' },
    { id: 10, name: 'Gemstone Pendant', category: 'jewelry', description: 'Natural stone pendant', price: 159.99, emoji: '💎', artisan: 'Aisha Patel' },
    { id: 11, name: 'Terracotta Planter', category: 'pottery', description: 'Large terracotta pot for plants', price: 69.99, emoji: '🪴', artisan: 'Carlos Mendez' },
    { id: 12, name: 'Canvas Painting', category: 'decor', description: 'Original acrylic painting', price: 199.99, emoji: '🖼️', artisan: 'Maya Patel' }
];

let cart = [];
let currentProduct = null;

document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    setupEventListeners();
    loadCartFromStorage();
    updateCartCount();
});

function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                ${product.emoji}
                <div class="product-badge">Artisan</div>
            </div>
            <div class="product-body">
                <div class="product-title">${product.name}</div>
                <div class="product-category">${product.category.toUpperCase()}</div>
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

function setupEventListeners() {
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

    document.getElementById('cartBtn').addEventListener('click', openCartModal);
    document.querySelector('#productModal .close').addEventListener('click', closeProductModal);
    document.getElementById('closeCartBtn').addEventListener('click', closeCartModal);
    document.getElementById('closeCheckoutBtn').addEventListener('click', closeCheckoutModal);
    document.getElementById('cartModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('cartModal')) closeCartModal();
    });
    document.getElementById('productModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('productModal')) closeProductModal();
    });
    document.getElementById('checkoutModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('checkoutModal')) closeCheckoutModal();
    });
    document.getElementById('addToCartBtn').addEventListener('click', addToCart);
    document.getElementById('checkoutBtn').addEventListener('click', openCheckoutModal);
    document.getElementById('checkoutForm').addEventListener('submit', completeCheckout);
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        currentProduct = product;
        document.getElementById('modalImage').textContent = product.emoji;
        document.getElementById('modalTitle').textContent = product.name;
        document.getElementById('modalDescription').textContent = product.description;
        document.getElementById('modalPrice').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('modalArtisan').textContent = `By: ${product.artisan}`;
        document.getElementById('quantityInput').value = 1;
        document.getElementById('productModal').classList.add('active');
    }
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    currentProduct = null;
}

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

function showAddedNotification() {
    const cartBtn = document.getElementById('cartBtn');
    const originalColor = cartBtn.style.background;
    cartBtn.style.background = '#2ecc71';
    setTimeout(() => {
        cartBtn.style.background = originalColor || '';
    }, 1000);
}

function openCartModal() {
    displayCartItems();
    document.getElementById('cartModal').classList.add('active');
}

function closeCartModal() {
    document.getElementById('cartModal').classList.remove('active');
}

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

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToStorage();
    updateCartCount();
    displayCartItems();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.06;
    const total = subtotal + tax;
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

function openCheckoutModal() {
    if (cart.length > 0) {
        closeCartModal();
        document.getElementById('checkoutModal').classList.add('active');
    }
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
}

function completeCheckout(e) {
    e.preventDefault();
    const form = document.getElementById('checkoutForm');
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <p>✓ Order Placed Successfully!</p>
        <p>Thank you for supporting artisans!</p>
        <p style="font-size: 0.9em; margin-top: 10px;">Your order will be shipped soon.</p>
    `;
    form.parentNode.insertBefore(successMsg, form);
    form.style.display = 'none';
    setTimeout(() => {
        cart = [];
        saveCartToStorage();
        updateCartCount();
        closeCheckoutModal();
        document.getElementById('checkoutForm').style.display = '';
        successMsg.remove();
    }, 2000);
}

function saveCartToStorage() {
    localStorage.setItem('handmadeCraftsCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('handmadeCraftsCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}
