// State management for Shopping Cart - Observer Pattern

import { saveCart, loadCart } from './storage.js';

// Product catalog
const PRODUCTS = [
    {
        id: 1,
        name: 'Laptop',
        price: 999.99,
        image: 'https://via.placeholder.com/150?text=Laptop',
        description: 'High-performance laptop with 16GB RAM',
    },
    {
        id: 2,
        name: 'Wireless Phone',
        price: 699.99,
        image: 'https://via.placeholder.com/150?text=Phone',
        description: 'Latest smartphone with advanced camera',
    },
    {
        id: 3,
        name: 'Noise-Cancelling Headphones',
        price: 199.99,
        image: 'https://via.placeholder.com/150?text=Headphones',
        description: 'Premium audio with active noise cancellation',
    },
    {
        id: 4,
        name: 'Smart Watch',
        price: 249.99,
        image: 'https://via.placeholder.com/150?text=Smart+Watch',
        description: 'Track fitness and notifications on your wrist',
    },
    {
        id: 5,
        name: 'Tablet',
        price: 449.99,
        image: 'https://via.placeholder.com/150?text=Tablet',
        description: '10-inch tablet perfect for media and work',
    },
    {
        id: 6,
        name: 'Bluetooth Speaker',
        price: 79.99,
        image: 'https://via.placeholder.com/150?text=Speaker',
        description: 'Portable speaker with rich bass',
    },
];

/**
 * CreateStore - Simple observable state container
 * @param {Object} initialState - Initial state object
 * @returns {Object} Store with getState, setState, subscribe methods
 */
function createStore(initialState) {
    let state = initialState;
    const listeners = [];

    return {
        getState: () => ({ ...state }),

        setState: (updates) => {
            state = { ...state, ...updates };
            // Notify all subscribers
            listeners.forEach((listener) => listener(state));
        },

        subscribe: (listener) => {
            listeners.push(listener);
            // Return unsubscribe function
            return () => {
                const index = listeners.indexOf(listener);
                if (index > -1) {
                    listeners.splice(index, 1);
                }
            };
        },
    };
}

// Create store with initial state
const store = createStore({
    products: PRODUCTS,
    cart: [],
});

/**
 * Get products
 * @returns {Array} Products array
 */
export function getProducts() {
    return store.getState().products;
}

/**
 * Get cart items
 * @returns {Array} Cart items
 */
export function getCart() {
    return store.getState().cart;
}

/**
 * Add product to cart
 * @param {number} productId - Product ID
 */
export function addToCart(productId) {
    const state = store.getState();
    const existingItem = state.cart.find(
        (item) => item.productId === productId
    );

    if (existingItem) {
        // Increment quantity
        store.setState({
            cart: state.cart.map((item) =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ),
        });
    } else {
        // Add new item
        store.setState({
            cart: [...state.cart, { productId, quantity: 1 }],
        });
    }

    saveCart(store.getState().cart);
}

/**
 * Update quantity of cart item
 * @param {number} productId - Product ID
 * @param {number} quantity - New quantity
 */
export function updateQuantity(productId, quantity) {
    const state = store.getState();

    if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        store.setState({
            cart: state.cart.filter((item) => item.productId !== productId),
        });
    } else {
        store.setState({
            cart: state.cart.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
            ),
        });
    }

    saveCart(store.getState().cart);
}

/**
 * Remove item from cart
 * @param {number} productId - Product ID
 */
export function removeFromCart(productId) {
    const state = store.getState();
    store.setState({
        cart: state.cart.filter((item) => item.productId !== productId),
    });
    saveCart(store.getState().cart);
}

/**
 * Calculate cart total
 * @returns {number} Total price
 */
export function getCartTotal() {
    const state = store.getState();
    return state.cart.reduce((total, item) => {
        const product = state.products.find((p) => p.id === item.productId);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

/**
 * Get total item count in cart
 * @returns {number} Total quantity
 */
export function getCartCount() {
    const state = store.getState();
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}

/**
 * Clear entire cart
 */
export function clearCart() {
    store.setState({ cart: [] });
    saveCart([]);
}

/**
 * Subscribe to cart changes
 * @param {Function} listener - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribe(listener) {
    return store.subscribe(listener);
}

/**
 * Initialize cart from localStorage
 */
export function initializeCart() {
    const savedCart = loadCart();
    if (savedCart.length > 0) {
        store.setState({ cart: savedCart });
    }
}
