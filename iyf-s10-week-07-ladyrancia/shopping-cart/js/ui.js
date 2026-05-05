// UI rendering for Shopping Cart

import {
    getProducts,
    getCart,
    getCartTotal,
    getCartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subscribe,
} from './state.js';
import { formatPrice, escapeHtml } from './utils.js';

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const cartTotalDisplay = document.getElementById('cartTotal');
const cartBadge = document.getElementById('cartBadge');
const clearCartBtn = document.getElementById('clearCartBtn');
const emptyCartMsg = document.getElementById('emptyCartMsg');

/**
 * Initialize UI
 */
export function initUI() {
    renderProducts();
    renderCart();

    // Clear cart button
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (confirm('Clear all items from cart?')) {
                clearCart();
            }
        });
    }

    // Subscribe to state changes
    subscribe(() => {
        renderCart();
    });
}

/**
 * Render product catalog
 */
function renderProducts() {
    const products = getProducts();

    productsGrid.innerHTML = products
        .map(
            (product) => `
        <div class="product-card" data-product-id="${product.id}">
            <img src="${product.image}" alt="${escapeHtml(product.name)}">
            <h3>${escapeHtml(product.name)}</h3>
            <p class="description">${escapeHtml(product.description)}</p>
            <p class="price">${formatPrice(product.price)}</p>
            <button class="add-to-cart-btn" data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `
        )
        .join('');

    // Add event listeners
    document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            addToCart(productId);
        });
    });
}

/**
 * Render cart
 */
function renderCart() {
    const cart = getCart();
    const total = getCartTotal();

    // Update badge
    if (cartBadge) {
        const count = getCartCount();
        cartBadge.textContent = count;
        cartBadge.style.display = count > 0 ? 'inline' : 'none';
    }

    // Update total display
    if (cartTotalDisplay) {
        cartTotalDisplay.textContent = formatPrice(total);
    }

    // Show/hide empty message
    if (emptyCartMsg) {
        emptyCartMsg.style.display = cart.length === 0 ? 'block' : 'none';
    }

    // Render cart items
    if (cartItems) {
        cartItems.innerHTML = cart
            .map((item) => {
                const product = getProducts().find(
                    (p) => p.id === item.productId
                );
                if (!product) {
                    return '';
                }

                return `
                <div class="cart-item" data-product-id="${item.productId}">
                    <img src="${product.image}" alt="${escapeHtml(product.name)}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4>${escapeHtml(product.name)}</h4>
                        <p class="price">${formatPrice(product.price)}</p>
                    </div>
                    <div class="cart-item-controls">
                        <button class="qty-btn minus" data-product-id="${item.productId}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="qty-btn plus" data-product-id="${item.productId}">+</button>
                        <button class="remove-btn" data-product-id="${item.productId}">Remove</button>
                    </div>
                </div>
            `;
            })
            .join('');

        // Add event listeners
        attachCartEventListeners();
    }
}

/**
 * Attach event listeners to cart controls
 */
function attachCartEventListeners() {
    // Decrease quantity
    document.querySelectorAll('.qty-btn.minus').forEach((btn) => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            const cart = getCart();
            const item = cart.find((i) => i.productId === productId);
            if (item) {
                updateQuantity(productId, item.quantity - 1);
            }
        });
    });

    // Increase quantity
    document.querySelectorAll('.qty-btn.plus').forEach((btn) => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            addToCart(productId);
        });
    });

    // Remove item
    document.querySelectorAll('.remove-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            removeFromCart(productId);
        });
    });
}
