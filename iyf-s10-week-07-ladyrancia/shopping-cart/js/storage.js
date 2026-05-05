// Storage module for Shopping Cart

const STORAGE_PREFIX = 'shopcart_';
const CART_KEY = 'cart';

/**
 * Save cart to localStorage
 * @param {Array} cart - Cart items array
 */
export function saveCart(cart) {
    try {
        localStorage.setItem(STORAGE_PREFIX + CART_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error('Failed to save cart:', error);
    }
}

/**
 * Load cart from localStorage
 * @returns {Array} Cart items or empty array
 */
export function loadCart() {
    try {
        const data = localStorage.getItem(STORAGE_PREFIX + CART_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to load cart:', error);
        return [];
    }
}

/**
 * Clear cart from storage
 */
export function clearCart() {
    try {
        localStorage.removeItem(STORAGE_PREFIX + CART_KEY);
    } catch (error) {
        console.error('Failed to clear cart:', error);
    }
}
