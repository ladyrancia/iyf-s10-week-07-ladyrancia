// Main entry point for Shopping Cart

import { initializeCart } from './state.js';
import { initUI } from './ui.js';

/**
 * Initialize the application
 */
function init() {
    // Load cart from localStorage
    initializeCart();

    // Initialize UI
    initUI();

    console.log('Shopping Cart initialized successfully');
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
